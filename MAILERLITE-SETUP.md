# MailerLite integration and verification

The signup form mounts as React markup before the MailerLite universal script loads, to avoid a script/React timing race.

- Account ID: `2763064`
- Embedded form ID: `200z0U`
- Source: `src/main.jsx`, component `MailerLiteForm`
- The original head script has been removed to avoid loading the script before React renders the target container.

**Important:** Form still needs to be published/active in MailerLite and the live integration tested. In your browser, open Developer Tools > Network and check `assets.mailerlite.com/js/universal.js` loaded successfully. Disable ad/tracker blockers while testing, and check the console for errors. Try a published HTTPS deployment if localhost blocks loading. Verify a test email arrives under MailerLite Subscribers (and confirm opt-in if enabled).

If it is still blank, open the form in MailerLite, confirm it's published and that `200z0U` remains the correct form ID; re-copy the HTML code there.

The visual vendor marks are CSS text representations, not licensed/official brand asset files. Replace them with permitted official vendor logos before advertising commercial partnerships. This site does not claim affiliation.
