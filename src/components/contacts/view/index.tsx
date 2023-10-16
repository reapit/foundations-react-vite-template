import { FC } from 'react'
import {
  BodyText,
  Col,
  elFadeIn,
  elMr4,
  FlexContainer,
  Grid,
  Icon,
  StatusIndicator,
  Subtitle,
  Tag,
} from '@reapit/elements'
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

  return (
    <Grid>
      <Col className={elFadeIn}>
        <FlexContainer>
          <Icon className={elMr4} icon="applicantInfographic" iconSize="medium" />
          <div>
            <Subtitle hasNoMargin>Contact Name</Subtitle>
            <BodyText hasGreyText>{combineName(title, forename, surname)}</BodyText>
          </div>
        </FlexContainer>
      </Col>
      <Col className={elFadeIn}>
        <FlexContainer>
          <Icon className={elMr4} icon="feedInfographic" iconSize="medium" />
          <div>
            <Subtitle hasNoMargin>Active Status</Subtitle>
            <div>
              <StatusIndicator intent={active ? 'success' : 'danger'} /> {active ? 'Active' : 'Inactive'}
            </div>
          </div>
        </FlexContainer>
      </Col>
      {mobilePhone && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="phoneInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Mobile Phone</Subtitle>
              <BodyText hasGreyText>{mobilePhone}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {homePhone && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="phoneInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Home Phone</Subtitle>
              <BodyText hasGreyText>{homePhone}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {workPhone && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="phoneInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Work Phone</Subtitle>
              <BodyText hasGreyText>{workPhone}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {email && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="mailInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Email</Subtitle>
              <BodyText hasGreyText>{email}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {primaryAddress && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="houseInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Primary Address</Subtitle>
              <BodyText hasGreyText>{combineAddress(primaryAddress)}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {secondaryAddress && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="houseInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Secondary Address</Subtitle>
              <BodyText hasGreyText>{combineAddress(secondaryAddress)}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {workAddress && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="houseInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Work Address</Subtitle>
              <BodyText hasGreyText>{combineAddress(workAddress)}</BodyText>
            </div>
          </FlexContainer>
        </Col>
      )}
      {negotiators && negotiatorIds && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="vendorInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Negotiators</Subtitle>
              {negotiatorIds?.map((id) => (
                <Tag key={id}>{negotiators._embedded?.find((neg) => neg.id === id)?.name ?? ''}</Tag>
              ))}
            </div>
          </FlexContainer>
        </Col>
      )}
      {offices && officeIds && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="flatInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Offices</Subtitle>
              {officeIds?.map((id) => (
                <Tag key={id}>{offices._embedded?.find((office) => office.id === id)?.name ?? ''}</Tag>
              ))}
            </div>
          </FlexContainer>
        </Col>
      )}
      {categories && categories.length && categoryIds && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="listInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Categories</Subtitle>
              {categoryIds?.map((id) => (
                <Tag key={id}>{categories?.find((category) => category.id === id)?.value ?? ''}</Tag>
              ))}
            </div>
          </FlexContainer>
        </Col>
      )}
      {sources && source && (
        <Col className={elFadeIn}>
          <FlexContainer>
            <Icon className={elMr4} icon="webInfographic" iconSize="medium" />
            <div>
              <Subtitle hasNoMargin>Source</Subtitle>
              <Tag>{sources?._embedded?.find((item) => item.id === source?.id)?.name ?? ''}</Tag>
            </div>
          </FlexContainer>
        </Col>
      )}
      <Col className={elFadeIn}>
        <FlexContainer>
          <Icon className={elMr4} icon="shieldInfographic" iconSize="medium" />
          <div>
            <Subtitle hasNoMargin>Marketing Preferences</Subtitle>
            <Tag>
              {marketingConsent === 'grant'
                ? 'Has Marketing Consent'
                : marketingConsent === 'Deny'
                ? 'No Marketing Consent'
                : 'Marketing Consent Not Requested'}
            </Tag>
            <Tag>
              {communicationPreferenceLetter
                ? 'Prefers Letter Communications'
                : 'Does Not Prefer Letter Communications'}
            </Tag>
            <Tag>
              {communicationPreferenceEmail ? 'Prefers Email Communications' : 'Does Not Prefer Email Communications'}
            </Tag>
            <Tag>
              {communicationPreferencePhone ? 'Prefers Phone Communications' : 'Does Not Prefer Phone Communications'}
            </Tag>
            <Tag>
              {communicationPreferenceSMS ? 'Prefers SMS Communications' : 'Does Not Prefer SMS Communications'}
            </Tag>
          </div>
        </FlexContainer>
      </Col>
    </Grid>
  )
}

export default ContactsEditView
