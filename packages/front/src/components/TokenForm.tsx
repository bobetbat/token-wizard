import React from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Grid, MenuItem, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface IUnlockPoint {
  date: string;
  amount: number;
}

interface IFormInput {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  decimals: number;
  initialDistributionAddress: string;
  launchDate: string;
  tokenDescription?: string;
  websiteUrl?: string;
  whitepaperUrl?: string;
  contactEmail?: string;
  unlockingStrategy: string;
  unlockPoints: IUnlockPoint[];
}

export const TokenLaunchForm: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      unlockPoints: [{ date: '', amount: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'unlockPoints'
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Token Name"
            {...register("tokenName", { required: true, minLength: 3, maxLength: 50 })}
            error={!!errors.tokenName}
            helperText={errors.tokenName ? "Token Name is required and should be between 3 and 50 characters." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Token Symbol"
            {...register("tokenSymbol", { required: true, minLength: 3, maxLength: 5 })}
            error={!!errors.tokenSymbol}
            helperText={errors.tokenSymbol ? "Token Symbol is required and should be between 3 and 5 characters." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Total Supply"
            type="number"
            {...register("totalSupply", { required: true, min: 1 })}
            error={!!errors.totalSupply}
            helperText={errors.totalSupply ? "Total Supply is required and should be a positive number." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Decimals"
            type="number"
            {...register("decimals", { required: true, min: 0, max: 18 })}
            error={!!errors.decimals}
            helperText={errors.decimals ? "Decimals are required and should be between 0 and 18." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Initial Distribution Address"
            {...register("initialDistributionAddress", { required: true, pattern: /^0x[a-fA-F0-9]{40}$/ })}
            error={!!errors.initialDistributionAddress}
            helperText={errors.initialDistributionAddress ? "A valid Ethereum address is required." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Launch Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("launchDate", { required: true })}
            error={!!errors.launchDate}
            helperText={errors.launchDate ? "Launch Date is required." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Token Description"
            multiline
            rows={4}
            {...register("tokenDescription", { maxLength: 500 })}
            error={!!errors.tokenDescription}
            helperText={errors.tokenDescription ? "Maximum length is 500 characters." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Website URL"
            type="url"
            {...register("websiteUrl", { pattern: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/ })}
            error={!!errors.websiteUrl}
            helperText={errors.websiteUrl ? "Must be a valid URL." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Whitepaper URL"
            type="url"
            {...register("whitepaperUrl", { pattern: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/ })}
            error={!!errors.whitepaperUrl}
            helperText={errors.whitepaperUrl ? "Must be a valid URL." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Email"
            type="email"
            {...register("contactEmail", { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
            error={!!errors.contactEmail}
            helperText={errors.contactEmail ? "Must be a valid email." : ""}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="unlockingStrategy"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="Unlocking Strategy"
                {...field}
                error={!!errors.unlockingStrategy}
                helperText={errors.unlockingStrategy ? "Unlocking Strategy is required." : ""}
                fullWidth
                size="small"
              >
                <MenuItem value="immediate">Immediate</MenuItem>
                <MenuItem value="vesting">Vesting Over Time</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        {fields.map((field, index) => (
          <Grid container item xs={12} spacing={2} key={field.id}>
            <Grid item xs={5}>
              <TextField
                label="Unlock Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register(`unlockPoints.${index}.date`, { required: "Unlock Date is required." })}
                error={!!errors.unlockPoints?.[index]?.date}
                helperText={errors.unlockPoints?.[index]?.date?.message}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Unlock Amount"
                type="number"
                {...register(`unlockPoints.${index}.amount`, { required: "Unlock Amount is required.", min: 1 })}
                error={!!errors.unlockPoints?.[index]?.amount}
                helperText={errors.unlockPoints?.[index]?.amount ? "Unlock Amount should be a positive number." : ""}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => remove(index)} disabled={fields.length === 1}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={'auto'}>
          <Button startIcon={<Add />} onClick={() => append({ date: '', amount: 0 })}>
            Add lock point
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

