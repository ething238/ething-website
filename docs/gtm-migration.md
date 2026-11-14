# GTM migration for ethingsolutions.com

The website migration changes its GTM container to `GTM-T9DHQSVJ`. GA4 remains
`G-2W7W1TB2H4` and keeps its existing property, stream, key events, historical data
and Search Console association. GA4 continues to own pageviews through the direct
Google tag and enhanced measurement. The replacement GTM container does not add
another GA4 configuration tag or forward the same GA4 events again.

## Prepared container

The reviewed draft is saved in the [Default Workspace](https://tagmanager.google.com/#/container/accounts/6336865557/containers/242233288/workspaces/3).
It contains 11 pending changes: six added tags, four added triggers and the Apollo
exception. Anuj Gupta has Publish access; the signed-in editor does not.

Import `config/gtm/GTM-T9DHQSVJ.json` into the existing replacement container with
**Merge → Overwrite conflicting tags, triggers and variables**. Preserve the
workspace backup before importing. Review these six migrated tags:

- Existing Google Ads account `AW-18230390699` and Conversion Linker.
- Existing Ads lead label, triggered by `generate_lead` after confirmed delivery.
- Existing second Ads label, retaining its legacy `conversion` event trigger.
- Existing Microsoft Clarity project `x7qri3eadq`.
- Calendly message bridge, restricted to Calendly origins. A confirmed scheduled
  event emits the existing GA4 key event `invitee_meeting_scheduled` once per
  booking, without contact details. Ordinary booking-link clicks are separate.
  Bookings completed entirely on an external Calendly page require Calendly's
  own GA4 integration or a webhook to confirm completion.

The existing Apollo tag is blocked on ethingsolutions.com initialization. This
avoids activating an additional vendor during this site's migration and preserves
that tag's existing behavior on any other domains that use the container.
All new triggers are restricted to ethingsolutions.com and its www hostname.

## Publish and switch in order

1. Anuj Gupta, or another account with Publish access, reviews and publishes the
   prepared GTM workspace. Suggested version: **eThing tracking migration**.
2. Verify the published container contains the six migrated tags, the four
   production triggers, and the Apollo exception. GTM must report no compile
   errors. The website still uses the old container until the next step.
3. Merge the tested website branch `codex/gtm-owned-container` into main and push.
   Follow the existing website deployment process; Hostinger operations remain
   excluded from the agent's work at the user's request.
4. With Tag Assistant, confirm the site loads `GTM-T9DHQSVJ` and the primary GA4
   property receives one pageview per page load and navigation. The combined
   Google tag also has an existing separate destination named eThing India;
   events sent to that property are not duplicate events in the primary property.
5. Check enquiry success/error flows. `generate_lead` must occur once after
   confirmed delivery and never on validation, delivery failure or a mere click.
   Verify email/phone clicks as `contact_click`, separate from confirmed leads.

The signed-in editor can prepare this workspace but cannot publish it. Do not
deploy the website ID switch before a publisher confirms the new container is live.

## Recovery

Before the website cutover, leave the existing production site unchanged if the
new container cannot be published. After cutover, revert the website migration
commit if necessary; the original published container remains available.
