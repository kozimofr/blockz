import React, { ReactNode, useState, useCallback } from "react"
import Autosuggest from 'react-autosuggest';
import classNames from "classnames"
import has from "lodash/has"
import find from "lodash/find"
import debounce from "lodash/debounce"
import noop from "lodash/noop"

import Label from "./Label"
import InputNote from "./InputNote"

import TextInputBase, { TextInputBasePropsType } from "./TextInput/Base"

import styles from "./Autocomplete.module.scss"

export interface AutocompleteSuggestionType {
  label: string;
  value: string;
  item?: any;
}

export interface AutocompleteSuggestionsSectionType {
  section: string;
  suggestions: AutocompleteSuggestionType[];
}

export interface AutocompleteThemeType {
  container?: string;
  containerOpen?: string;
  input?: string;
  inputOpen?: string;
  inputFocused?: string;
  suggestionsContainer?: string;
  suggestionsContainerOpen?: string;
  suggestionsList?: string;
  suggestion?: string;
  suggestionFirst?: string;
  suggestionHighlighted?: string;
  sectionContainer?: string;
  sectionContainerFirst?: string;
  sectionTitle?: string;
}

interface HandleChangeType {
  newValue: string;
  method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type';
}

interface HandleFetchRequestedType {
  value: string;
  reason: 'input-changed' | 'input-focused' | 'escape-pressed' | 'suggestions-revealed' | 'suggestion-selected';
}

interface HandleSelectType {
  suggestion: AutocompleteSuggestionType;
  suggestionValue: string;
  suggestionIndex: number;
  sectionIndex: number;
  method: 'click' | 'enter';
}

export interface AutocompletePropsType extends Omit<TextInputBasePropsType, "onChange" | "value"> {
  defaultSuggestion?: AutocompleteSuggestionType;
  suggestions: AutocompleteSuggestionsSectionType[] | AutocompleteSuggestionType[];
  onFetchRequested: (value: string) => void;
  onClearRequested?: () => void;
  fetchDelay?: number;
  onSelect?: (value: string, suggestion: AutocompleteSuggestionType, event?: React.ChangeEvent<HTMLInputElement>) => void;
  renderSuggestion?: (suggestion: AutocompleteSuggestionType) => ReactNode;
  renderSuggestionsContainer?: (options: any) => ReactNode;
  renderSectionTitle?: (section: AutocompleteSuggestionsSectionType) => ReactNode;
  shouldAlwaysRenderSuggestions?: boolean;
  theme?: AutocompleteThemeType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const defaultRenderSuggestion = ({ label }: AutocompleteSuggestionType) => (
  <div>{ label }</div>
)

const defaultRenderSuggestionsContainer = ({ containerProps, children }: any): ReactNode => {
  return (
    <div {...containerProps}>
      { children }
    </div>
  );
}

const defaultRenderSectionTitle = (section: AutocompleteSuggestionsSectionType) => (
  <strong>{section.section}</strong>
)

const defaultGetSectionSuggestions = (section: AutocompleteSuggestionsSectionType) => {
  return section.suggestions;
}

export default React.forwardRef<HTMLInputElement, AutocompletePropsType>(
  function Autocomplete(
    {
      id,
      name,
      className,
      defaultSuggestion,
      suggestions,
      onFetchRequested,
      fetchDelay = 0,
      onClearRequested = noop,
      renderSuggestion = defaultRenderSuggestion,
      renderSuggestionsContainer = defaultRenderSuggestionsContainer,
      renderSectionTitle = defaultRenderSectionTitle,
      onSelect = noop,
      shouldAlwaysRenderSuggestions = false,
      theme = {},
      size = "large",
      label,
      hasError,
      isDisabled,
      isReadOnly,
      note,
      onClick,
      style,
      ...props
    }: AutocompletePropsType,
    outerRef
  ): JSX.Element {
    const onFetchRequestedDebounce = useCallback<any>(debounce((value: string): void => {
      if(value !== ""){
        onFetchRequested(value)
      }else{
        onClearRequested()
      }
    }, fetchDelay), [onFetchRequested, onClearRequested])

    const [search, setSearch] = useState(defaultSuggestion ? defaultSuggestion.label : "")
    const [value, setValue] = useState<string>(defaultSuggestion ? defaultSuggestion.value : "")

    const shouldRenderSuggestions = (value: string, _: string) => {
      return shouldAlwaysRenderSuggestions ? true : value.trim().length > 0;
    }

    const handleChange = (_: any, { newValue }: HandleChangeType) => {
      setSearch(newValue)
    }

    const handleFetchRequested = ({ value }: HandleFetchRequestedType) => {
      onFetchRequestedDebounce(value)
    }

    const handleSelectSuggestion = (_: any, { suggestion }: HandleSelectType) => {
      setValue(suggestion.value)
      onSelect(suggestion.value, suggestion)
    }

    return (
      <div
        className={classNames("relative", className)}
        onClick={onClick}
        style={style}
      >
        <input
          ref={outerRef}
          id={id}
          name={name}
          type="hidden"
          value={value}
        />
        {!!label && (
          <Label {...{ hasError, isDisabled, isReadOnly }} className="mb-1">{ label }</Label>
        )}
        <Autosuggest
          theme={{
            ...styles,
            sectionTitle: classNames({
              [styles.sectionTitle]: true,
              [styles.sectionTitleSizeSmall]: size === "small",
              [styles.sectionTitleSizeLarge]: size === "large"
            }),
            suggestion: classNames({
              [styles.suggestion]: true,
              [styles.suggestionSizeSmall]: size === "small",
              [styles.suggestionSizeLarge]: size === "large"
            }),
            theme
          }}
          id={!!id ? `${id}-autocomplete` : undefined}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleFetchRequested}
          onSuggestionsClearRequested={noop}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          getSuggestionValue={(suggestion: AutocompleteSuggestionType) => suggestion.label}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={defaultGetSectionSuggestions}
          shouldRenderSuggestions={shouldRenderSuggestions}
          onSuggestionSelected={handleSelectSuggestion}
          multiSection={!!find(suggestions, s => has(s, "section"))}
          inputProps={{
            ...props,
            size,
            hasError,
            isDisabled,
            isReadOnly,
            value: search,
            onChange: handleChange,
            name: !!name ? `${name}-autocomplete` : "autocomplete"
          }}
          renderInputComponent={(inputProps: any) => <TextInputBase {...inputProps}/>}
        />

        {!!note && (
          <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
        )}
      </div>
    )
  }
)
