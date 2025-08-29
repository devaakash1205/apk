# **App Name**: PhonePay Prototype

## Core Features:

- Splash Screen: Splash screen with PhonePe-style animation/logo.
- Onboarding: Onboarding intro with slides (mock permissions like camera, contacts).
- User Profile: Static profile with Name, Mobile Number, Profile Picture.
- Bank Account Management: Manually add multiple bank accounts, including: Account holder name, Bank name, Account number, IFSC code, Custom UPI ID. Allow the user to edit or delete accounts, and adjust account balance manually.
- UPI ID Management: Create UPI IDs for each bank account. Simulate uniqueness check, and allow editing (with simple string validation).
- Payment Simulation: Send money to UPI ID, QR code (parse UPI ID), or Contacts (stored users). Enter amount, note, and choose bank account to debit from. Simulate balance deduction, receiver name lookup (mock), and generate fake success/failure status.
- QR Code Scanning: Scan QR and extract UPI ID. Pre-fill payment screen based on scan.  Option to simulate QR creation for each UPI.
- Transaction History: Save all simulated transactions with Date/time, Sender & receiver, Amount, Status (success/failure), and Payment method (QR/UPI/contact). Display history in grouped list (like PhonePe).

## Style Guidelines:

- Primary color: #5f259f (PhonePe purple).
- Accent color: gradients like #4c1d95 → #7c3aed.
- Light backgrounds: #f4f4f4.
- Fonts: Roboto or custom rounded sans-serif.
- Layout: Same grid, spacing, bottom tabs, button styling.
- Icons: Use Ionicons, MaterialIcons, or custom SVGs to match PhonePe.
- Splash screen animation, Button ripple, Smooth transitions between screens, Success animation (use Lottie).