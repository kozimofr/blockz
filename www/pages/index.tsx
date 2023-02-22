import { useState } from "react"
import classNames from "classnames"
import includes from "lodash/includes"
import keys from "lodash/keys"
import { GetServerSideProps } from 'next'
import { useForm } from "react-hook-form";

import {
  AccountIcon,
  AccountFillIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CautionIcon,
  CautionFillIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CrossIcon,
  HeartIcon,
  HeartFillIcon,
  HomeIcon,
  InfoIcon,
  InfoFillIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MapMarkerIcon,
  MinusIcon,
  NextIcon,
  NextFillIcon,
  PhoneIcon,
  PlusIcon,
  PreviousIcon,
  PreviousFillIcon,
  QuestionIcon,
  QuestionFillIcon,
  SearchIcon,
  StarIcon,
  StarFillIcon,
  SuccessIcon,
  SuccessFillIcon,
  WarningIcon,
  WarningFillIcon
} from '@kozimo/blockz-icons'
import {
  Title,
  Text,
  Button,
  TextInput,
  TextArea,
  Select,
  Radio,
  Checkbox,
  Switch,
  StarRating,
  StarRatingInput,
  BannerAlert,
  Alert,
  Image,
  UserAvatar,
  EntityAvatar,
  Modal,
  Tooltip,
  Breadcrumbs,
  HtmlContent,
  ShowMore,
  QueryPagination,
  StatePagination,
  PathPagination,
  Pill,
  Autocomplete,
  AutocompleteSuggestionType,
  Popover,
  Message
} from "@kozimo/blockz-react"
const colors: any = require("@kozimo/blockz-scss/config/colors.json")

const Card = ({ children, title }: any) => (
  <div className="max-w-6 rounded-xlarge mx-auto bg-white shadow-1 p-5 mb-5">
    <Title heading={2} size={2} className="mb-5">{ title }</Title>
    { children }
  </div>
)

const Section = ({ children, title }: any) => (
  <div className="mb-5">
    <Title heading={2} size={3} className="mb-3">{ title }</Title>
    { children }
  </div>
)

const SubSection = ({ children, title }: any) => (
  <div className="my-3">
    <Title heading={2} size={4} className="mb-2">{ title }</Title>
    { children }
  </div>
)

const ColorCard = ({ hex, name }: any) => (
  <div className="border rounded-xsmall overflow-hidden mr-3" style={{ width: "70px" }}>
    <div className="mx-auto" style={{ backgroundColor: hex, height: "70px" }}></div>
    <Text className="border-t  py-2 text-center" size={3}> { name }</Text>
  </div>
)

type AvatarSizeType = "small" | "medium" | "large" | "xlarge" | "xsmall"
const avatarSizes: AvatarSizeType[] = ["xlarge", "large", "medium", "small", "xsmall"]

type ButtonThemeType = "primary" | "secondary" | "tertiary" | "caution"
const buttonThemes: ButtonThemeType[] = ['primary', 'secondary', 'tertiary', 'caution']

type ButtonVariantType = "solid" | "outline" | "inverse"
const buttonVariants: ButtonVariantType[] = ['solid', 'outline', 'inverse']

type TextSizeType = 1 | 2 | 3 | 4
const textSizes: TextSizeType[] = [1, 2, 3, 4]

type TitleSizeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
const titleSizes: TitleSizeType[] = [1, 2, 3, 4, 5, 6, 7, 8]

const SUGGESTIONS = [{
  label: "First",
  value: "1"
}, {
  label: "Second",
  value: "2"
}, {
  label: "Third",
  value: "3"
}, {
  label: "Fourth",
  value: "4"
}, {
  label: "Fifth",
  value: "5"
}]

const SUGGESTIONS_SECTIONS = [{
  section: "Section 1",
  suggestions: [{
    label: "First",
    value: "1"
  }, {
    label: "Second",
    value: "2"
  }, {
    label: "Third",
    value: "3"
  }]
}, {
  section: "Section 2",
  suggestions: [{
    label: "First",
    value: "1"
  }, {
    label: "Second",
    value: "2"
  }]
}]

interface SearchAutocompletePropsType {
  className?: string;
  hasSections?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
}

const SearchAutocomplete = ({
  className,
  hasSections = false,
  isLoading = false,
  hasError = false,
  isDisabled = false
}: SearchAutocompletePropsType) => {
  const [suggestions, setSuggestions] = useState(hasSections ? SUGGESTIONS_SECTIONS : SUGGESTIONS)
  const [value, setValue] = useState<string|null>(null)

  const handleFetchRequested = (value: string) => {
    if(!hasSections){
      setSuggestions(SUGGESTIONS.filter(
        (suggestion: AutocompleteSuggestionType) => (value === "" || includes(suggestion.label.toLowerCase(), value))
      ))
    }
  }

  const handleSelect = (value: string) => {
    setValue(value)
  }

  return (
    <div className={className}>
      <Autocomplete
        label="Search for something"
        iconLeft="search"
        placeholder="Placeholder"
        suggestions={suggestions}
        onFetchRequested={handleFetchRequested}
        onSelect={handleSelect}
        isLoading={isLoading}
        hasError={hasError}
        isDisabled={isDisabled}
        name="search"
      />
      <Text size={4} className="mt-1">
      Selected value : { value ? value : "Nothing yet..." }
      </Text>
    </div>
  )
}

const Form = () => {
  const [result, setResult] = useState()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      textinput: "Lala",
      numberInput: 3,
      textarea: "Lala",
      select: "",
      checkbox1: false,
      checkbox2: false,
      switch1: "",
      switch2: true,
      radio: "",
      starrating: "0",
      autocomplete: "1"
    }
  })
  const onSubmit = (data: any) => setResult(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        ref={register({ required: true })}
        label="Text Input"
        name="textinput"
      />
      <TextInput
        ref={register({ required: true })}
        label="Number Input"
        name="numberInput"
        type="number"
      />
      <TextArea
        ref={register({ required: true })}
        label="Text Area"
        name="textarea"
      />
      <Select
        ref={register({ required: true })}
        label="Select"
        name="select"
      >
        <option value="">Empty</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
      <Checkbox
        ref={register({ required: true })}
        name="checkbox1"
      >
        Checkbox 1
      </Checkbox>
      <Checkbox
        ref={register({ required: true })}
        name="checkbox2"
      >
        Checkbox 2
      </Checkbox>
      <Switch
        ref={register({ required: true })}
        name="switch1"
      >
        Switch 1
      </Switch>
      <Switch
        ref={register({ required: true })}
        name="switch2"
      >
        Switch 2
      </Switch>
      <Radio
        ref={register({ required: true })}
        name="radio"
        value="1"
      >
        Radio 1
      </Radio>
      <Radio
        ref={register({ required: true })}
        name="radio"
        value="2"
      >
        Radio 2
      </Radio>
      <StarRatingInput
        ref={register({ required: true })}
        name="starrating"
        size="large"
      />
      <Autocomplete
        ref={register({ required: true })}
        name="autocomplete"
        label="Autocomplete"
        suggestions={SUGGESTIONS}
        onFetchRequested={() => {}}
        defaultSuggestion={SUGGESTIONS[0]}
      />
      <Button type="submit">
        Envoyer
      </Button>
      {result ? (
        <pre>
        { JSON.stringify(result, null, 2) }
        </pre>
      ) : (
        <>
        {errors && (
          <pre>
          { JSON.stringify(keys(errors), null, 2) }
          </pre>
        )}
        </>
      )}
    </form>
  );
}

export default function Home() {
  const [textInput, setTextInput] = useState("")
  const [smallWidthModalIsOpen, setSmallWidthModalIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [largeWidthModalIsOpen, setLargeWidthModalIsOpen] = useState(false)
  const [mediumHeightModalIsOpen, setMediumHeightModalIsOpen] = useState(false)
  const [largeHeightModalIsOpen, setLargeHeightModalIsOpen] = useState(false)
  const [showMoreIsExpanded, setShowMoreIsExpanded] = useState(false)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const [borderedPopoverIsOpen, setBorderedPopoverIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-200 pb-5 pt-6">
      <div className="container">
        <Title className="text-center mb-6" heading={1}>Blockz Playground</Title>
        <Card title="Icon">
          {[
            AccountIcon,
            AccountFillIcon,
            ArrowDownIcon,
            ArrowLeftIcon,
            ArrowRightIcon,
            ArrowUpIcon,
            CautionIcon,
            CautionFillIcon,
            ChatIcon,
            CheckIcon,
            ChevronDownIcon,
            ChevronLeftIcon,
            ChevronRightIcon,
            ChevronUpIcon,
            CrossIcon,
            HeartIcon,
            HeartFillIcon,
            HomeIcon,
            InfoIcon,
            InfoFillIcon,
            LinkIcon,
            LockIcon,
            MailIcon,
            MapMarkerIcon,
            MinusIcon,
            NextIcon,
            NextFillIcon,
            PhoneIcon,
            PlusIcon,
            PreviousIcon,
            PreviousFillIcon,
            QuestionIcon,
            QuestionFillIcon,
            SearchIcon,
            StarIcon,
            StarFillIcon,
            SuccessIcon,
            SuccessFillIcon,
            WarningIcon,
            WarningFillIcon
          ].map((icon, i) =>
            !!icon ? (
              <span className="text-black" key={i}>{ icon({ size: 40 }) }</span>
            ) : null
          )}
        </Card>


        <Card title="Typography">
          <div className="flex">
            <div className="w-1/2">
            {
              titleSizes.map(i => (
                <Title key={i} size={i}>Heading {i}</Title>
              ))
            }
            </div>
            <div className="w-1/2">
            {
              textSizes.map(i => (
                <Text key={i} size={i}><b>Bold body {i}</b></Text>
              ))
            }
            {
              textSizes.map(i => (
                <Text key={i} size={i}>Body {i}</Text>
              ))
            }
            </div>
          </div>
        </Card>


        <Card title="Color">
        {
          Object.keys(colors).filter((c: string) => c !== "transparent" && c !== "white" && c !== "current" && c !== "inherit").map((color: string, i) => (
            <div key={i} className="mb-5">
              <Title className="mb-3" size={3}>{ color.charAt(0).toUpperCase() + color.slice(1) }</Title>
              <div className="flex">
                {
                  typeof colors[color] === "string" ? (
                    <ColorCard hex={colors[color]} name="default"/>
                  ) : Object.keys(colors[color]).map((c, j) => (
                    <ColorCard key={j} hex={colors[color][c]} name={c}/>
                  ))
                }
              </div>
            </div>
          ))
        }
        </Card>

        <Card title="Image">
          <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg"
            containerAspectRatio={728 / 485}
            sources={[
              {
                type: 'image/webp',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.webp 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.webp 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.webp 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.webp 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.webp 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.webp 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.webp 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.webp 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.webp 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.webp 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.webp 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.webp 2560w
                `,
              },
              {
                type: 'image/jpeg',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.jpeg 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.jpeg 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.jpeg 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.jpeg 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.jpeg 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.jpeg 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.jpeg 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.jpeg 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.jpeg 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.jpeg 2560w
                `,
              },
            ]}
            alt="Cat laying in the sun"
          />
        </Card>


        <Card title="Button">
          <Section title="Sizes">
            <div className="flex items-end">
              <Button>Large button</Button>
              <Button className="ml-3" size="small">Small button</Button>
            </div>
          </Section>

          <Section title="Themes">
            <div className="flex flex-wrap">
              {buttonThemes.map((theme, i) => (
                <Button
                  key={i}
                  className="mr-3"
                  theme={theme}
                >
                  { theme.charAt(0).toUpperCase() + theme.slice(1) }
                </Button>
              ))}
            </div>
          </Section>

          <Section title="Variants">
            <div className="flex flex-wrap bg-blue p-3">
              {buttonVariants.map((variant, i) => (
                <Button
                  key={i}
                  className="mr-3"
                  variant={variant}
                >
                  { variant.charAt(0).toUpperCase() + variant.slice(1) }
                </Button>
              ))}
            </div>
          </Section>

          <Section title="Variants">
            <SubSection title="Loading">
              <div className="flex flex-wrap">
                {buttonThemes.map((theme, i) => (
                  <Button
                    key={i}
                    className="mr-3 mb-3"
                    theme={theme}
                    isLoading
                  >
                    { theme.charAt(0).toUpperCase() + theme.slice(1) }
                  </Button>
                ))}
              </div>
            </SubSection>
            <SubSection title="States">
              <div className="flex flex-wrap">
                {buttonThemes.map((theme, i) => (
                  <Button
                    key={i}
                    className="mr-3 mb-3"
                    theme={theme}
                    isDisabled
                  >
                    { theme.charAt(0).toUpperCase() + theme.slice(1) }
                  </Button>
                ))}
              </div>
            </SubSection>
            <SubSection title="With icon">
              <div className="flex items-end">
                <Button iconLeft="search" size="large">Large button</Button>
                <Button className="ml-3" size="small" iconLeft="search">Small button</Button>
              </div>
            </SubSection>
          </Section>
        </Card>


        <Card title="Text Input">
          <Section title="Normal / With icon / With inner">
            <div className="flex">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                className="ml-3 w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                innerRight={<div className="h-full px-3 flex items-center font-600 bg-gray-200 border-l">%</div>}
              />
            </div>
          </Section>
          <Section title="Sizes">
            <div className="flex items-end">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                size="large"
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                iconLeft="search"
                size="small"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                innerRight={<div className="h-full px-2 flex items-center font-600 bg-gray-200 border-l">%</div>}
                size="small"
              />
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <TextInput
                label="Disabled"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                size="large"
                isDisabled
              />
              <TextInput
                label="Read only"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft="search"
                isReadOnly
              />
              <TextInput
                label="Error"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft="search"
                hasError
              />
            </div>
          </Section>
          <Section title="Label & Note">
            <div className="flex items-end">
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="w-full"
                size="large"
                note="This field should contain @"
              />
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                size="small"
                note="This field should contain @"
              />
            </div>
          </Section>
        </Card>
        <Card title="Text Area">
          <Section title="States">
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              isDisabled
              className="mt-3"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              hasError
              className="mt-3"
            />
          </Section>
        </Card>
        <Card title="Select">
          <Section title="Sizes">
            <div className="flex items-end">
              <Select onChange={() => {}} value={""} label="Label" note="Note" className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select onChange={() => {}} value={""} label="Label" note="Note" size="small" className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Select onChange={() => {}} value={""} label="Label" note="Note" hasError className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select onChange={() => {}} value={""} label="Label" note="Note" isDisabled className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
        </Card>
        <Card title="Checkbox">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Checkbox onChange={() => {}} isChecked>This is a checkbox</Checkbox>
              <Checkbox onChange={() => {}} className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Checkbox onChange={() => {}} isDisabled>This is a checkbox</Checkbox>
              <Checkbox onChange={() => {}} hasError className="ml-3">This is a checkbox</Checkbox>
              <Checkbox onChange={() => {}} isIndeterminate className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
        </Card>
        <Card title="Switch">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Switch onChange={() => {}} isChecked>This is a switch</Switch>
              <Switch onChange={() => {}} className="ml-3">This is a switch</Switch>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Switch onChange={() => {}} isDisabled>This is a switch</Switch>
              <Switch onChange={() => {}} hasError className="ml-3">This is a switch</Switch>
            </div>
          </Section>
        </Card>
        <Card title="Radio">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Radio name="radio" onChange={() => {}} isChecked>This is a radio</Radio>
              <Radio name="radio" onChange={() => {}} className="ml-3">This is a radio</Radio>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Radio name="radio" onChange={() => {}} isDisabled>This is a radio</Radio>
              <Radio name="radio" onChange={() => {}} hasError className="ml-3">This is a radio</Radio>
            </div>
          </Section>
        </Card>
        <Card title="Autocomplete">
          <Section title="Simple autocomplete">
            <SearchAutocomplete/>
          </Section>
          <Section title="With sections">
            <SearchAutocomplete hasSections/>
          </Section>
          <Section title="States">
            <SearchAutocomplete className="mb-3" isLoading />
            <SearchAutocomplete className="mb-3" hasError />
            <SearchAutocomplete className="mb-3" isDisabled />
          </Section>
        </Card>
        <Card title="Complete form example">
          <Form/>
        </Card>
        <Card title="Avatar">
          <Section title="Variants">
            <div className="flex">
              <EntityAvatar className="mr-3" imageUrl="https://www.placecage.com/640/480" size="xlarge" />
              <UserAvatar imageUrl="https://www.placecage.com/640/480" size="xlarge" />
            </div>
          </Section>
          <Section title="Sizes">
            <div className="flex items-end">
              {avatarSizes.map((size, i) => (
                <EntityAvatar key={i} className="mr-3" imageUrl="https://www.placecage.com/640/480" size={size} />
              ))}
            </div>
          </Section>
          <Section title="Without image">
            <div className="flex items-end">
              <EntityAvatar className="mr-3" initial="A" size="xlarge" />
              <UserAvatar initials="BB" size="xlarge" />
            </div>
          </Section>
        </Card>
        <Card title="Star Rating">
          <Section title="Sizes">
            <div className="flex items-end">
              <StarRating rating={0} reviewsCount={5}/>
              <StarRating className="ml-3" size="medium" rating={2.5} reviewsCount={5}/>
              <StarRating className="ml-3" size="large" rating={5} reviewsCount={5}/>
            </div>
          </Section>
        </Card>
        <Card title="Alert">
          <Section title="Themes">
            <Alert className="mb-3" theme="success">Alert Success</Alert>
            <Alert className="mb-3" theme="info">Alert Info</Alert>
            <Alert className="mb-3" theme="warning">Alert Warning</Alert>
            <Alert theme="caution">Alert Caution</Alert>
          </Section>
        </Card>
        <Card title="Banner Alert">
          <Section title="Themes">
            <BannerAlert className="mb-3" theme="success">Banner Success</BannerAlert>
            <BannerAlert className="mb-3" theme="info">Banner Info</BannerAlert>
            <BannerAlert className="mb-3" theme="warning">Banner Warning</BannerAlert>
            <BannerAlert theme="caution">Banner Caution</BannerAlert>
          </Section>
        </Card>
        <Card title="Message">
          <Section title="Themes">
            <Message className="mb-3" theme="success">Message Success</Message>
            <Message className="mb-3" theme="info">Message Info</Message>
            <Message className="mb-3" theme="warning">Message Warning</Message>
            <Message theme="caution">Message Caution</Message>
          </Section>
          <Section title="Positions">
            <Message className="mb-3" position="top">Message Top</Message>
            <Message className="mb-3" position="right">Message Right</Message>
            <Message className="mb-3" position="bottom">Message Bottom</Message>
            <Message position="left">Message Left</Message>
          </Section>
        </Card>
        <Card title="Pill">
          <Section title="Colors">
            {["pink", "blue", "turquoise", "purple", "green", "red", "orange", "yellow"].map((color, i) => (
              // @ts-ignore
              <Pill key={i} className="mr-2" color={color}>Pill { color }</Pill>
            ))}
          </Section>
          <Section title="Sizes">
          {(["large", "medium", "small"]).map((size, i) => (
            // @ts-ignore
            <Pill key={i} className="mr-2" color="pink" size={size}>Pill {size}</Pill>
          ))}
          </Section>
          <Section title="With Icon">
            <Pill color="pink" icon="search">Pill with an icon</Pill>
          </Section>
        </Card>
        <Card title="Modal">
          <Section title="Width">
            <Button className="mr-3 mb-3" onClick={() => setModalIsOpen(true)}>Default width modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setSmallWidthModalIsOpen(true)}>Small width modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setLargeWidthModalIsOpen(true)}>Large width modal</Button>
          </Section>
          <Section title="Height">
            <Button className="mr-3 mb-3" onClick={() => setMediumHeightModalIsOpen(true)}>Medium height modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setLargeHeightModalIsOpen(true)}>Large height modal</Button>
          </Section>
          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <Title size={4}>This is a default width modal</Title>
          </Modal>
          <Modal width="small" isOpen={smallWidthModalIsOpen} onClose={() => setSmallWidthModalIsOpen(false)}>
            <Title size={4}>This is a small width modal</Title>
          </Modal>
          <Modal width="large" isOpen={largeWidthModalIsOpen} onClose={() => setLargeWidthModalIsOpen(false)}>
            <Title size={4}>This is a large width modal</Title>
          </Modal>
          <Modal height="medium" isOpen={mediumHeightModalIsOpen} onClose={() => setMediumHeightModalIsOpen(false)}>
            <Title size={4}>This is a medium height modal</Title>
          </Modal>
          <Modal height="large" isOpen={largeHeightModalIsOpen} onClose={() => setLargeHeightModalIsOpen(false)}>
            <Title size={4}>This is a large height modal</Title>
          </Modal>
        </Card>
        <Card title="Tooltip">
          <Section title="Position">
            <div className="flex">
              <Tooltip className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoIcon size="large"/>
                  <Text size={1} className="ml-2"><b>Top</b></Text>
                </div>
              </Tooltip>
              <Tooltip position="bottom" className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoIcon size="large"/>
                  <Text size={1} className="ml-2"><b>Bottom</b></Text>
                </div>
              </Tooltip>
              <Tooltip position="left" className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoIcon size="large"/>
                  <Text size={1} className="ml-2"><b>Left</b></Text>
                </div>
              </Tooltip>
              <Tooltip position="right" className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoIcon size="large"/>
                  <Text size={1} className="ml-2"><b>Right</b></Text>
                </div>
              </Tooltip>
            </div>
          </Section>
          <Section title="Theme">
            <div className="bg-blue-300 flex items-center justify-center text-white p-6">
              <Tooltip theme="light" text="This is a tooltip">
                <InfoIcon size="large"/>
              </Tooltip>
            </div>
          </Section>
        </Card>
        <Card title="Breadcrumbs">
          <Breadcrumbs breadcrumbs={[{
            name: "First item",
            path: "/"
          }, {
            name: "Second item",
            path: "/second"
          }, {
            name: "Third item",
            path: "/third"
          }]}/>
        </Card>
        <Card title="HTML Content and Longread">
          <div className="longread">
            <HtmlContent>
            {`
              <h1>Lorem ipsum dolor sit amet</h1>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend posuere venenatis.
                  Cras est mi, porta a suscipit id, vehicula at sem. Phasellus malesuada est non magna mollis,
                  sit amet molestie odio tincidunt. Nulla ex urna, tristique non massa consequat, eleifend
                  interdum magna.
              </p>
              <h2>Morbi sagittis, dolor et molestie rhoncus</h2>
              <ul>
                  <li>Phasellus at quam lacus</li>
                  <li>Aenean quis est neque</li>
                  <li>Maecenas a tincidunt risus</li>
              </ul>
              <h2>Duis pretium viverra leo ac sagittis?</h2>
              <p>
                  Vivamus a consectetur libero, sit amet sagittis neque. Etiam non elit nec purus tempus
                  tincidunt id sit amet ipsum. Sed scelerisque enim viverra vehicula hendrerit.
              </p>
              <h3>Morbi sagittis, dolor et molestie rhoncus</h3>
              <table>
                <thead>
                  <tr>
                    <th>Pièce</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clé à laine</td>
                    <td>230€</td>
                  </tr>
                  <tr>
                    <td>Clé de serrage</td>
                    <td>210€</td>
                  </tr>
                </tbody>
              </table>
              <h2>Duis pretium viverra leo ac sagittis?</h2>
              <div>
                <table>
                  <colgroup>
                    <col></col>
                    <col></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>Pièce</td>
                      <td>Prix</td>
                    </tr>
                    <tr>
                      <td>Clé à laine</td>
                      <td>230€</td>
                    </tr>
                    <tr>
                      <td>Clé de serrage</td>
                      <td>210€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                  Proin sit amet metus eu augue suscipit blandit at eu massa. Suspendisse semper sed lectus
                  quis suscipit. Praesent finibus lobortis facilisis. Maecenas est leo, tincidunt id fermentum
                  non, varius ac turpis. Quisque a nibh egestas, commodo dui a, malesuada felis. Etiam dolor
                  urna, eleifend sed placerat ac, tempor vestibulum quam.
              </p>
              <h3>Integer nunc nibh, vestibulum vel lorem ac</h3>
              <p>
                  In et turpis fringilla, posuere metus at, pellentesque lectus. Ut vulputate magna in velit
                  aliquam, eu egestas ante dignissim. Sed pellentesque dolor a interdum vehicula. Donec vitae
                  tellus finibus, blandit nunc eu, maximus dui. In molestie rhoncus sapien. Curabitur ornare
                  nisl sollicitudin magna placerat, eget ullamcorper libero cursus. Nunc aliquet erat ut
                  elementum fermentum. Integer eleifend varius tempus. Etiam sed pellentesque lorem, eget
                  varius felis.
              </p>
              <ol>
                  <li>Ut vehicula felis magna, sit amet tincidunt urna tristique euismod.</li>
                  <li>Integer posuere velit et nibh sollicitudin aliquam.</li>
                  <li>Vestibulum quis neque tellus.</li>
              </ol>
              <p>
                  Cras varius dui quis efficitur posuere. Duis vel lacinia orci. Donec pharetra nisl vel
                  tortor interdum, id suscipit felis venenatis. Phasellus accumsan blandit euismod. Nullam
                  ipsum nisi, sagittis vel cursus sed, feugiat eget ipsum. Quisque quis enim vel justo
                  vestibulum laoreet consequat ut nibh. In luctus augue sit amet leo fermentum, et vulputate
                  sapien placerat. Nulla et pellentesque magna. Fusce elit enim, facilisis et urna sed,
                  eleifend ultrices diam. Nam a fringilla ipsum. Nulla vitae hendrerit orci, sit amet faucibus
                  mi.
              </p>
            `}
            </HtmlContent>
          </div>
        </Card>
        <Card title="Show More">
          <Section title="Default">
            <ShowMore
              isExpanded={showMoreIsExpanded}
              onClick={() => setShowMoreIsExpanded(!showMoreIsExpanded)}
              size={3}
            >
              <div>This is a paragraph inside my component.</div>
              <div className={classNames({"hidden": !showMoreIsExpanded})}>This is a second paragraph inside my component what was hidden.</div>
            </ShowMore>
          </Section>
          <Section title="Variants">
            <ShowMore
              className="mb-5"
              isShrinkable={false}
              isExpanded={showMoreIsExpanded}
              onClick={() => setShowMoreIsExpanded(!showMoreIsExpanded)}
              size={3}
            >
              <div>This is a paragraph inside my component and I won't be able to shrink it afterwards.</div>
              <div className={classNames({"hidden": !showMoreIsExpanded})}>This is a second paragraph inside my component what was hidden.</div>
            </ShowMore>
            <ShowMore
              isShrinkable={false}
              chevronIsHidden
              isExpanded={showMoreIsExpanded}
              onClick={() => setShowMoreIsExpanded(!showMoreIsExpanded)}
              size={3}
            >
              <div>This is a paragraph inside my component and I don't have a chevron.</div>
              <div className={classNames({"hidden": !showMoreIsExpanded})}>This is a second paragraph inside my component what was hidden.</div>
            </ShowMore>
          </Section>
        </Card>
        <Card title="Pagination">
          <Section title="Using local state">
            <StatePagination page={1} pagesCount={10} onClick={() => {}}/>
          </Section>
          <Section className="mt-5" title="Using query string parameter">
            <QueryPagination pagesCount={10}/>
          </Section>
          <Section className="mt-5" title="Using url path">
            <PathPagination pagesCount={10}/>
          </Section>
        </Card>
        <Card title="Popover">
          <Section title="Default">
            <Popover
              isOpen={popoverIsOpen}
              onClose={() => setPopoverIsOpen(false)}
              position="top"
              shouldCloseOnClickOutside
              arrowIsHidden
              closeButtonIsHidden
              width="small"
              borderColor="transparent"
              content={(
                <>
                  <Title className="mb-1" size={6}>This is my Popover title</Title>
                  <Text size={3}>This is my Popover content and it should wrap if the content is too long.</Text>
                  <Button
                    onClick={() => setPopoverIsOpen(false)}
                    size="small"
                    theme="secondary"
                    className="mt-2"
                  >
                    Close
                  </Button>
                </>
              )}
            >
              <Button
                onClick={() => setPopoverIsOpen(!popoverIsOpen)}
              >
                Open Popover
              </Button>
            </Popover>
          </Section>
          <Section title="With border">
            <Popover
              isOpen={borderedPopoverIsOpen}
              onClose={() => setBorderedPopoverIsOpen(false)}
              position="top"
              shouldCloseOnClickOutside
              width="large"
              content={(
                <>
                  <Title className="mb-1" size={6}>This is my Popover title</Title>
                  <Text size={3}>This is my Popover content and it should wrap if the content is too long.</Text>
                  <Button
                    onClick={() => setBorderedPopoverIsOpen(false)}
                    size="small"
                    theme="secondary"
                    className="mt-2"
                  >
                    Close
                  </Button>
                </>
              )}
            >
              <Button
                onClick={() => setBorderedPopoverIsOpen(!borderedPopoverIsOpen)}
              >
                Open Popover
              </Button>
            </Popover>
          </Section>
        </Card>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}
