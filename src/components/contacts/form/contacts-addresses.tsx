import { cx } from '@linaria/core'
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
  Button,
  elMb7,
} from '@reapit/elements'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { COUNTRY_OPTIONS } from './contacts-country-options'
import { ContactFormSchema } from './contacts-validation-schema'

export const ADDRESS_TYPE_OPTIONS = [
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Home', value: 'home' },
  { name: 'Work', value: 'work' },
  { name: 'Forwarding', value: 'forwarding' },
  { name: 'Company', value: 'company' },
  { name: 'Previous', value: 'previous' },
]

interface ContactsAddressesProps {
  form: UseFormReturn<ContactFormSchema, any>
}

export const handleAddAddress = (setHasAsAddress: Dispatch<SetStateAction<boolean>>, hasAddress: boolean) => () => {
  setHasAsAddress(!hasAddress)
}

export const ContactsAddresses: FC<ContactsAddressesProps> = ({ form }) => {
  const [hasSecondaryAddress, setHasSecondaryAddress] = useState<boolean>(false)
  const [hasWorkAddress, setHasWorkAddress] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
  } = form

  return (
    <>
      <div className={elMb11}>
        <BodyText hasGreyText hasNoMargin>
          Provide up to three addresses for your contact. All addresses are optional, only primary address is shown by
          default.
        </BodyText>
      </div>
      <BodyText>Primary Address</BodyText>
      <FormLayout className={cx(elMb11, elFadeIn)}>
        <InputWrap>
          <InputGroup>
            <Select {...register('primaryAddress.type')} defaultValue="primary">
              <option key="default-option" value="">
                None selected
              </option>
              {ADDRESS_TYPE_OPTIONS.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </Select>
            <Label>Address Type</Label>
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('primaryAddress.buildingName')}
            type="text"
            label="Building Name"
            placeholder="Name of the building"
          />
          {errors.primaryAddress?.buildingName?.message && (
            <InputError message={errors.primaryAddress.buildingName.message} />
          )}
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('primaryAddress.buildingNumber')}
            type="text"
            label="Building Number"
            placeholder="Number of the building"
          />
          {errors.primaryAddress?.buildingNumber?.message && (
            <InputError message={errors.primaryAddress.buildingNumber.message} />
          )}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('primaryAddress.line1')} type="text" label="Line 1" placeholder="Address line 1" />
          {errors.primaryAddress?.line1?.message && <InputError message={errors.primaryAddress.line1.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('primaryAddress.line2')} type="text" label="Line 2" placeholder="Address line 2" />
          {errors.primaryAddress?.line2?.message && <InputError message={errors.primaryAddress.line2.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('primaryAddress.line3')} type="text" label="Line 3" placeholder="Address line 3" />
          {errors.primaryAddress?.line3?.message && <InputError message={errors.primaryAddress.line3.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('primaryAddress.line4')} type="text" label="Line 4" placeholder="Address line 4" />
          {errors.primaryAddress?.line4?.message && <InputError message={errors.primaryAddress.line4.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('primaryAddress.postcode')}
            type="text"
            label="Post Code"
            placeholder="Address post code"
          />
          {errors.primaryAddress?.postcode?.message && <InputError message={errors.primaryAddress.postcode.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Select {...register('primaryAddress.countryId')} defaultValue="GB">
              <option key="default-option" value="">
                None selected
              </option>
              {COUNTRY_OPTIONS.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </Select>
            <Label>Country</Label>
          </InputGroup>
        </InputWrap>
      </FormLayout>
      {hasSecondaryAddress ? (
        <>
          <BodyText>Secondary Address</BodyText>
          <FormLayout className={cx(elMb11, elFadeIn)}>
            <InputWrap>
              <InputGroup>
                <Select {...register('secondaryAddress.type')} defaultValue="secondary">
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {ADDRESS_TYPE_OPTIONS.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Label>Address Type</Label>
              </InputGroup>
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.buildingName')}
                type="text"
                label="Building Name"
                placeholder="Name of the building"
              />
              {errors.secondaryAddress?.buildingName?.message && (
                <InputError message={errors.secondaryAddress.buildingName.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.buildingNumber')}
                type="text"
                label="Building Number"
                placeholder="Number of the building"
              />
              {errors.secondaryAddress?.buildingNumber?.message && (
                <InputError message={errors.secondaryAddress.buildingNumber.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.line1')}
                type="text"
                label="Line 1"
                placeholder="Address line 1"
              />
              {errors.secondaryAddress?.line1?.message && (
                <InputError message={errors.secondaryAddress.line1.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.line2')}
                type="text"
                label="Line 2"
                placeholder="Address line 2"
              />
              {errors.secondaryAddress?.line2?.message && (
                <InputError message={errors.secondaryAddress.line2.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.line3')}
                type="text"
                label="Line 3"
                placeholder="Address line 3"
              />
              {errors.secondaryAddress?.line3?.message && (
                <InputError message={errors.secondaryAddress.line3.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.line4')}
                type="text"
                label="Line 4"
                placeholder="Address line 4"
              />
              {errors.secondaryAddress?.line4?.message && (
                <InputError message={errors.secondaryAddress.line4.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('secondaryAddress.postcode')}
                type="text"
                label="Post Code"
                placeholder="Address post code"
              />
              {errors.secondaryAddress?.postcode?.message && (
                <InputError message={errors.secondaryAddress.postcode.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Select {...register('secondaryAddress.countryId')} defaultValue="GB">
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {COUNTRY_OPTIONS.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Label>Country</Label>
              </InputGroup>
            </InputWrap>
          </FormLayout>
          <div className={elMb7}>
            <Button onClick={handleAddAddress(setHasSecondaryAddress, hasSecondaryAddress)} intent="low">
              Remove Secondary Address
            </Button>
          </div>
        </>
      ) : (
        <div className={elMb7}>
          <Button onClick={handleAddAddress(setHasSecondaryAddress, hasSecondaryAddress)} intent="low">
            Add Secondary Address
          </Button>
        </div>
      )}
      {hasWorkAddress ? (
        <>
          <BodyText>Work Address</BodyText>
          <FormLayout className={cx(elMb11, elFadeIn)}>
            <InputWrap>
              <InputGroup>
                <Select {...register('workAddress.type')} defaultValue="work">
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {ADDRESS_TYPE_OPTIONS.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Label>Address Type</Label>
              </InputGroup>
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('workAddress.buildingName')}
                type="text"
                label="Building Name"
                placeholder="Name of the building"
              />
              {errors.workAddress?.buildingName?.message && (
                <InputError message={errors.workAddress.buildingName.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('workAddress.buildingNumber')}
                type="text"
                label="Building Number"
                placeholder="Number of the building"
              />
              {errors.workAddress?.buildingNumber?.message && (
                <InputError message={errors.workAddress.buildingNumber.message} />
              )}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('workAddress.line1')} type="text" label="Line 1" placeholder="Address line 1" />
              {errors.workAddress?.line1?.message && <InputError message={errors.workAddress.line1.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('workAddress.line2')} type="text" label="Line 2" placeholder="Address line 2" />
              {errors.workAddress?.line2?.message && <InputError message={errors.workAddress.line2.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('workAddress.line3')} type="text" label="Line 3" placeholder="Address line 3" />
              {errors.workAddress?.line3?.message && <InputError message={errors.workAddress.line3.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('workAddress.line4')} type="text" label="Line 4" placeholder="Address line 4" />
              {errors.workAddress?.line4?.message && <InputError message={errors.workAddress.line4.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('workAddress.postcode')}
                type="text"
                label="Post Code"
                placeholder="Address post code"
              />
              {errors.workAddress?.postcode?.message && <InputError message={errors.workAddress.postcode.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Select {...register('workAddress.countryId')} defaultValue="GB">
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {COUNTRY_OPTIONS.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Label>Country</Label>
              </InputGroup>
            </InputWrap>
          </FormLayout>
          <div className={elMb7}>
            <Button onClick={handleAddAddress(setHasWorkAddress, hasWorkAddress)} intent="low">
              Remove Work Address
            </Button>
          </div>
        </>
      ) : (
        <div className={elMb7}>
          <Button onClick={handleAddAddress(setHasWorkAddress, hasWorkAddress)} intent="low">
            Add Work Address
          </Button>
        </div>
      )}
    </>
  )
}
