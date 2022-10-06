import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import styled from 'styled-components'
import Input from './components/Input';
import Button from './components/Button';
import Container from './components/Container';
import Section from './components/Section';
import Balance from './components/Balance';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * ((rate / 100) + 1);
  }
  return Math.round(total)
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const Title = styled.label`
  color: white;
  display: block;
  margin-bottom: 30px;
  font-size: 45px
`

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Title>Compound Interest</Title>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Required').typeError('It must be a number'),
            contribution: Yup.number().required('Required').typeError('It must be a number'),
            years: Yup.number().required('Required').typeError('It must be a number'),
            rate: Yup.number().required('Required').typeError('It must be a number').min(0, 'The minimum value is 0'),
          })}
        >
          <Form>
            <Input name="deposit" label="Initial Deposit" />
            <Input name="contribution" label="Annual Contribution" />
            <Input name="years" label="Years" />
            <Input name="rate" label="Estimated Interest (annual %)" />
            <Button type="submit">Calculate</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Result: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
