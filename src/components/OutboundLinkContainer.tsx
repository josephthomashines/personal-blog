import * as React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

export type LinkProps = {
  to: string
  children: any
}

export const OutboundLinkContainer = (props: LinkProps) => (
  <OutboundLink href={props.to} target="_blank" key={'elink-to-' + props.to}>
    {props.children}
  </OutboundLink>
)

export default OutboundLinkContainer
