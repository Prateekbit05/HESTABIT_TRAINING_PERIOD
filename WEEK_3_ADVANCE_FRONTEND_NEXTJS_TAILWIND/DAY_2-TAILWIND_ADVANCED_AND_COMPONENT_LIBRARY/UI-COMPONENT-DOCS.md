# UI Component Docs — Week 3 Day 2

> Reusable component library built with TailwindCSS inside `/components/ui/`

---

## 📦 Button

**File:** `components/ui/Button.jsx`

A flexible button component supporting multiple visual variants and sizes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"primary"` | `primary` \| `secondary` \| `danger` \| `outline` |
| `size` | `string` | `"md"` | `sm` \| `md` \| `lg` |
| `onClick` | `function` | — | Click handler |
| `disabled` | `boolean` | `false` | Disables the button |
| `children` | `node` | — | Button label/content |

### Usage

```jsx
import Button from "@/components/ui/Button";

// Primary
<Button variant="primary" onClick={() => console.log("clicked")}>
  Save Changes
</Button>

// Danger small
<Button variant="danger" size="sm">
  Delete
</Button>

// Outline disabled
<Button variant="outline" disabled>
  Unavailable
</Button>
```

---

## 📦 Input

**File:** `components/ui/Input.jsx`

A controlled text input with label, error state, and helper text support.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label shown above the input |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Controlled value |
| `onChange` | `function` | — | Change handler |
| `error` | `string` | — | Error message (shows in red below input) |
| `helperText` | `string` | — | Helper text shown below input |
| `type` | `string` | `"text"` | Input type (`text`, `email`, `password`, etc.) |

### Usage

```jsx
import Input from "@/components/ui/Input";

// Basic
<Input
  label="Email"
  placeholder="you@example.com"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With error
<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error="Password must be at least 8 characters"
/>

// With helper text
<Input
  label="Username"
  helperText="Only letters, numbers and underscores allowed"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

---

## 📦 Card

**File:** `components/ui/Card.jsx`

A composable content card with optional header, body, and footer slots.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card header title |
| `children` | `node` | — | Card body content |
| `footer` | `node` | — | Footer content (actions, links) |
| `shadow` | `boolean` | `true` | Adds drop shadow |
| `className` | `string` | — | Extra Tailwind classes |

### Usage

```jsx
import Card from "@/components/ui/Card";

// Basic card
<Card title="Total Users">
  <p className="text-3xl font-bold">1,240</p>
</Card>

// Card with footer
<Card
  title="Recent Orders"
  footer={<a href="/orders" className="text-blue-500 text-sm">View all →</a>}
>
  <p>5 new orders today</p>
</Card>

// No shadow
<Card title="Notes" shadow={false}>
  <p>Plain bordered card</p>
</Card>
```

---

## 📦 Badge

**File:** `components/ui/Badge.jsx`

A small inline status label with color-coded variants.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"neutral"` | `success` \| `warning` \| `error` \| `info` \| `neutral` |
| `children` | `node` | — | Badge text |

### Variant Colors

| Variant | Color |
|---------|-------|
| `success` | Green |
| `warning` | Yellow |
| `error` | Red |
| `info` | Blue |
| `neutral` | Gray |

### Usage

```jsx
import Badge from "@/components/ui/Badge";

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">In Review</Badge>
<Badge variant="neutral">Archived</Badge>
```

---

## 📦 Modal

**File:** `components/ui/Modal.jsx`

An overlay modal dialog with open/close state, title, body content, and action buttons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls visibility |
| `onClose` | `function` | — | Called when modal closes |
| `title` | `string` | — | Modal heading |
| `children` | `node` | — | Modal body content |
| `footer` | `node` | — | Action buttons (confirm, cancel, etc.) |

### Usage

```jsx
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const [open, setOpen] = useState(false);

// Trigger
<Button onClick={() => setOpen(true)}>Open Modal</Button>

// Modal
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
</Modal>
```

---

## 📤 Barrel Export (index.js)

Export all components from a single entry point:

```js
// components/ui/index.js
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Card } from "./Card";
export { default as Badge } from "./Badge";
export { default as Modal } from "./Modal";
```

Then import anywhere:

```jsx
import { Button, Card, Badge, Modal, Input } from "@/components/ui";
```


