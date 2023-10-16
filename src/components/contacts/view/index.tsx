import { FC } from 'react'
import { elFadeIn, KeyValueList, StatusIndicator, Badge, BadgeGroup } from '@reapit/elements'
import {
  ContactModel,
  ListItemModel,
  NegotiatorModelPagedResult,
  OfficeModelPagedResult,
  SourceModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { usePlatformGet } from '../../../hooks'
import { combineAddress } from '../../../utils/combine-address'
import { combineName } from '../../../utils/combine-name'

export interface ContactsEditViewProps {
  contact: ContactModel | null
}

export const ContactsEditView: FC<ContactsEditViewProps> = ({ contact }) => {
  const {
    title,
    forename,
    surname,
    negotiatorIds,
    primaryAddress,
    officeIds,
    workAddress,
    secondaryAddress,
    mobilePhone,
    homePhone,
    workPhone,
    email,
    categoryIds,
    source,
    active,
    marketingConsent,
    communicationPreferenceLetter,
    communicationPreferenceEmail,
    communicationPreferencePhone,
    communicationPreferenceSMS,
  } = contact ?? {}

  const [negotiators] = usePlatformGet<NegotiatorModelPagedResult>({
    path: '/negotiators',
    queryParams: {
      id: negotiatorIds,
    },
    fetchWhenTrue: [negotiatorIds?.length],
  })

  const [offices] = usePlatformGet<OfficeModelPagedResult>({
    path: '/offices',
    queryParams: {
      id: officeIds,
    },
    fetchWhenTrue: [officeIds?.length],
  })

  const [sources] = usePlatformGet<SourceModelPagedResult>({
    path: '/sources',
    queryParams: {
      id: source?.id,
    },
    fetchWhenTrue: [source?.id],
  })

  const [categories] = usePlatformGet<ListItemModel[]>({
    path: '/configuration/contactCategories',
    queryParams: {
      id: categoryIds,
    },
    fetchWhenTrue: [categoryIds?.length],
  })

  if (!contact) return null

  const sourceName = sources?._embedded?.find((item) => item.id === source?.id)?.name

  return (
    <>
      <KeyValueList
        className={elFadeIn}
        hasGrid
        items={[
          {
            key: 'Name',
            value: combineName(title, forename, surname),
            iconName: 'usernameSystem',
          },
          {
            key: 'Active Status',
            value: (
              <>
                <StatusIndicator intent={active ? 'success' : 'danger'} /> {active ? 'Active' : 'Inactive'}{' '}
              </>
            ),
            iconName: 'warningSystem',
          },
          {
            key: 'Email',
            value: email || 'Unknown',
            iconName: 'emailSystem',
          },

          {
            key: 'Mobile',
            value: mobilePhone || 'Unknown',
            iconName: 'phoneSystem',
          },
          {
            key: 'Home',
            value: homePhone || 'Unknown',
            iconName: 'phoneSystem',
          },
          {
            key: 'Work',
            value: workPhone || 'Unknown',
            iconName: 'phoneSystem',
          },
          {
            key: 'Primary Address',
            value: combineAddress(primaryAddress),
            iconName: 'homeSystem',
          },
          {
            key: 'Secondary Address',
            value: combineAddress(secondaryAddress),
            iconName: 'homeSystem',
          },
          {
            key: 'Work Address',
            value: combineAddress(workAddress),
            iconName: 'homeSystem',
          },
          {
            key: 'Negotiators',
            iconName: 'usernameSystem',
            value: (
              <BadgeGroup>
                {negotiatorIds?.length
                  ? negotiatorIds?.map((id) => (
                      <Badge intent="primary" key={id}>
                        {negotiators?._embedded?.find((neg) => neg.id === id)?.name ?? ''}
                      </Badge>
                    ))
                  : 'Unknown'}
              </BadgeGroup>
            ),
          },
          {
            key: 'Offices',
            iconName: 'companySystem',
            value: (
              <BadgeGroup>
                {officeIds?.length
                  ? officeIds?.map((id) => (
                      <Badge intent="primary" key={id}>
                        {offices?._embedded?.find((office) => office.id === id)?.name ?? ''}
                      </Badge>
                    ))
                  : 'Unknown'}
              </BadgeGroup>
            ),
          },
          {
            key: 'Categories',
            iconName: 'bulletListSystem',
            value: (
              <BadgeGroup>
                {categoryIds?.length && categories?.length
                  ? categoryIds?.map((id) => (
                      <Badge intent="primary" key={id}>
                        {categories?.find((category) => category.id === id)?.value ?? ''}
                      </Badge>
                    ))
                  : 'Unknown'}
              </BadgeGroup>
            ),
          },
          {
            key: 'Sources',
            iconName: 'cloudSystem',
            value: <BadgeGroup>{sourceName ? <Badge intent="primary">{sourceName}</Badge> : 'Unknown'}</BadgeGroup>,
          },
          {
            key: 'Marketing Preferences',
            iconName: 'messageSystem',
            value: (
              <BadgeGroup>
                <Badge intent="primary">
                  {marketingConsent === 'grant'
                    ? 'Marketing Consent'
                    : marketingConsent === 'Deny'
                    ? 'No Marketing Consent'
                    : 'Consent Not Requested'}
                </Badge>
                {communicationPreferenceLetter && <Badge intent="primary">Prefers Letter</Badge>}
                {communicationPreferenceEmail && <Badge intent="primary">Prefers Email</Badge>}
                {communicationPreferencePhone && <Badge intent="primary">Prefers Phone</Badge>}
                {communicationPreferenceSMS && <Badge intent="primary">Prefers SMS</Badge>}
              </BadgeGroup>
            ),
          },
        ]}
      />
    </>
  )
}

export default ContactsEditView
