import * as React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

export type LinkProps = {
  to: string
  children: any
}

export const OutboundLinkContainer = (props: LinkProps) => (
  <OutboundLink href={props.to} target='_blank'>
    {props.children}
  </OutboundLink>
)

export default OutboundLinkContainer
