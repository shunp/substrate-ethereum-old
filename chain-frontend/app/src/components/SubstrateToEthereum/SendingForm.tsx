import * as React from 'react'
import { useCallback } from 'react'
import { Form, Field, FormSpy } from 'react-final-form'
import { FORM_ERROR, FormState, fieldSubscriptionItems } from 'final-form'
import { Button, Typography, MenuItem, Box } from '@material-ui/core'
import { O } from 'ts-toolbelt'

import { DEFAULT_DECIMALS } from '~env'
import { useSubscribable } from '../../util/hook'
import { useApi } from '../context'
import getErrorMsg from '~util/getErrorMsg'
import { TextField } from '../form'
import { validateRequired, validateFloat } from '~util/validator'


interface FormData {
    address: string
    amount: string
    from: string
}

const fields: { [key in keyof FormData]: key } = {
    address: 'address',
    amount: 'amount',
    from: 'from',
}

type Errors = Partial<O.Update<FormData, keyof FormData, string>>

interface Props {
    onChange?(values: FormData, errors: Errors): void
}

function validate(values: FormData): Errors {
    return {
        from: validateRequired(values.from.toLowerCase()),
        // address: validateRequired(values.address) || validateEthereumAddress(values.address),
        amount: validateRequired(values.amount) || validateFloat(values.amount, DEFAULT_DECIMALS),
    }
}

function SendingForm({ onChange }: Props) {
    const api = useApi()
    const [accounts, { loaded: accountsLoaded, error: accountsError }] = useSubscribable(() => api.getSubstrateAccounts$(), [])
    console.log(accounts)

    const handleChange = useCallback(
        (formState: FormState<FormData>) => onChange && onChange(formState.values, formState.errors),
        [onChange]
    )
    const handleSubmit = useCallback(async ({ from, address, amount }: FormData) => {
        try {
            await api.sendToEthereum(from, address, amount);
        } catch (error) {
            return { [FORM_ERROR]: getErrorMsg(error) };
        }
    }, [])

    if (!accountsLoaded) {
        return null
    }

    if (!accounts || !accounts.length || accountsError) {
        return (<>
            <Typography color="error">
                You Substrate account can not be found, please install Polkadot.js browser extension and create an account.
            </Typography>
            <Typography color="error">
                If you already have account in the extension, please reopen the browser tab.
            </Typography>
        </>)
    }

    return (
        <Form<FormData>
            onSubmit={handleSubmit}
            subscription={{ submitting: true, submitError: true }}
            initialValues={{ from: accounts[0].address, address: '', amount: '' }}
            validate={validate}
        >
            {({ handleSubmit, submitting, submitError }): React.ReactElement<{}> => (
                <form onSubmit={handleSubmit}>
                    <FormSpy<FormData> onChange={handleChange} />
                    <Field
                        name={fields.address}
                        component={TextField}
                        fullWidth
                    >
                        {accounts.map(value => (<MenuItem value={value.address} key={value.address}>{value.meta.name} (value.address)</MenuItem>))}
                    </Field>
                    <Field
                        name={fields.amount}
                        component={TextField}
                        fullWidth
                        label="Amount"
                        margin="normal">

                    </Field>
                    {!!submitError && <Typography variant="body1" color="error">{submitError}</Typography>}
                    <Button fullWidth type="submit" variant="contained" color="primary" disabled={submitting}>
                        Send{submitting && 'ing'}
                    </Button>
                </form>
            )}
        </Form>
    )
}
export { Props as SendingFormProps }
export default SendingForm