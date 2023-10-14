import {
  BodyText,
  InputWrap,
  InputGroup,
  Label,
  Select,
  FormLayout,
  elFadeIn,
  elMb11,
  InputError,
} from '@reapit/elements'
import dayjs from 'dayjs'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ContactFormSchema } from './contacts-validation-schema'

export const TITLE_OPTIONS = ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr', 'Prof']

interface ContactPersonalProps {
  form: UseFormReturn<ContactFormSchema, any>
}

export const ContactsPersonal: FC<ContactPersonalProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <>
      <div className={elMb11}>
        <BodyText hasGreyText hasNoMargin>
          Provide us with some basic personal information about your contact.
        </BodyText>
      </div>
      <FormLayout className={elFadeIn}>
        <InputWrap>
          <InputGroup>
            <Select {...register('title')}>
              <option key="default-option" value="">
                None selected
              </option>
              {TITLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Label>Please select a title</Label>
            {errors.title?.message && <InputError message={errors.title.message} />}
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup
            label="First Name"
            placeholder="Please enter a first name"
            {...register('forename')}
            icon={errors?.forename?.message ? 'asteriskSystem' : undefined}
            intent="danger"
          />
          {errors.forename?.message && <InputError message={errors.forename.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup
            label="Surname"
            placeholder="Please enter a surname"
            {...register('surname')}
            icon={errors?.surname?.message ? 'asteriskSystem' : undefined}
            intent="danger"
          />
          {errors.surname?.message && <InputError message={errors.surname.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup
            label="Date of birth"
            type="date"
            {...register('dateOfBirth')}
            max={dayjs().format('YYYY-MM-DD')}
            icon={errors?.dateOfBirth?.message ? 'asteriskSystem' : undefined}
            intent="danger"
          />
          {errors.dateOfBirth?.message && <InputError message={errors.dateOfBirth.message} />}
        </InputWrap>
      </FormLayout>
    </>
  )
}
