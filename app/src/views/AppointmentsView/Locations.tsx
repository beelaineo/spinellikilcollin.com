import React, { useState } from 'react'
import styled, { css } from '@xstyled/styled-components'

import { TextBlock } from '../../components/ContentBlock/TextBlock'
import { ImageTextBlock } from '../../components/ContentBlock/ImageTextBlock'
import { Button } from '../../components/Button'
import { ContentBlock } from '../../components/ContentBlock'
import { Accordion } from './Accordion'
import { Image } from '../../components/Image'

interface LocationsProps {
  locations: any
  isMedium: boolean
}

interface iconWrapperProps {
  isActive: boolean
}

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    border-left: 1px solid black;
    padding-left: 10;
    position: relative;
    width: 100%;
    margin: 8 auto;
    display: flex;
    flex-direction: column;
    gap: 6;
    ${theme.mediaQueries.tablet} {
      border-left: none;
      margin: 0 auto;
      padding-left: 0;
    }
  `}
`

const CalendarWrapper = styled.div`
  ${({ theme }) => css`
    border-left: 1px solid black;
    padding-left: 10;
    position: relative;
    width: 100%;
    margin: 8 auto;
    display: flex;
    flex-direction: column;
    div:first-child > div {
      min-height: unset;
    }
    ${theme.mediaQueries.tablet} {
      border-left: none;
      margin: 0 auto;
      padding-left: 0;
    }
  `}
`

const ButtonsWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 6;
    width: 100%;
    z-index: 100;
    button {
      width: 100%;
      z-index: 100;
    }
    button:nth-child(2) {
      background-color: white;
      color: black;
      border: 1px solid black;
  `}
`

const Items = styled.ul`
  ${({ theme }) => css`
    max-width: 500px;
    position: relative;
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 40px;
    cursor: pointer;
    margin: 8 0;
    padding: 0;
  `}
`

const Item = styled.li`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6;
  `}
`

const TextWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
  `}
`
const IconWrapper = styled.div<iconWrapperProps>`
  ${({ theme, isActive }) => css`
    position: relative;
    display: flex;
    width: 90;

    &:hover {
      outline: 1px solid ${theme.colors.grays[4]};
      border-radius: 10px;
    }

    ${isActive &&
    `outline: 1px solid ${theme.colors.grays[6]}; 
    border-radius: 10px;

    &:hover {
      outline: 1px solid ${theme.colors.grays[6]};
      border-radius: 10px;
    }
    `}

    > div {
      aspect-ratio: 1;
      margin: 8px;
    }

    ${theme.mediaQueries.tablet} {
      width: 70;
    }
  `}
`

const Label = styled.span`
  ${({ theme }) => css`
    position: relative;
    font-size: 3;
    font-weight: 1;
    margin-bottom: 3;
    font-style: italic;
  `}
`

const Cta = styled.span`
  ${({ theme }) => css`
    position: relative;
    font-size: 5;
    font-weight: 2;
    text-transform: uppercase;
    text-decoration: underline;
  `}
`

export const Locations = ({ locations, isMedium }: LocationsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarIndex, setCalendarIndex] = useState(null)

  const handleLocationClick = (index: number) => () => {
    setActiveIndex(index)
    setShowCalendar(false)
  }

  return (
    <>
      <Items>
        {locations?.map((location, i) => {
          return isMedium ? (
            <Accordion
              key={i}
              renderLabel={() => (
                <Item key={i} onClick={handleLocationClick(i)}>
                  <IconWrapper isActive={activeIndex === i}>
                    <Image image={location?.icon} objectFit="contain" />
                  </IconWrapper>
                  <TextWrapper>
                    <Label>{location?.label}</Label>
                    <Cta>{location?.ctaLabel}</Cta>
                  </TextWrapper>
                </Item>
              )}
            >
              {calendarIndex !== i ? (
                <ContentWrapper>
                  <ImageTextBlock content={location?.image} />
                  <ButtonsWrapper>
                    <Button onClick={() => setCalendarIndex(i)}>
                      Book now
                    </Button>
                    {location?.phone && (
                      <Button>{`Call ${locations?.phone}`}</Button>
                    )}
                  </ButtonsWrapper>
                </ContentWrapper>
              ) : (
                <CalendarWrapper>
                  <TextBlock content={location?.body} />

                  {location?.content?.map((content, i) => (
                    <ContentBlock key={i} content={content} />
                  ))}
                </CalendarWrapper>
              )}
            </Accordion>
          ) : (
            <Item key={i} onClick={handleLocationClick(i)}>
              <IconWrapper isActive={activeIndex === i}>
                <Image image={location?.icon} objectFit="contain" />
              </IconWrapper>
              <TextWrapper>
                <Label>{location?.label}</Label>
                <Cta>{location?.ctaLabel}</Cta>
              </TextWrapper>
            </Item>
          )
        })}
      </Items>

      {!isMedium && locations && !showCalendar ? (
        <ContentWrapper>
          <ImageTextBlock content={locations[activeIndex]?.image} />
          <ButtonsWrapper>
            <Button onClick={() => setShowCalendar(true)}>Book now</Button>
            {locations[activeIndex]?.phone && (
              <Button>{`Call ${locations[activeIndex]?.phone}`}</Button>
            )}
          </ButtonsWrapper>
        </ContentWrapper>
      ) : (
        <CalendarWrapper>
          <TextBlock content={locations[activeIndex]?.body} />

          {!isMedium &&
            locations &&
            locations[activeIndex]?.content?.map((content, i) => (
              <ContentBlock key={i} content={content} />
            ))}
        </CalendarWrapper>
      )}
    </>
  )
}
