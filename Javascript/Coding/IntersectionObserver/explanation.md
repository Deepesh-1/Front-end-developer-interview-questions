# Intersection Observer --- Understanding the Basics

### What happens?

Initially:

``` text
Page
│
├── "Scroll down"
│
│
│
│
│
├── Box
│
└──
```

The box is below the viewport:

``` text
┌─────────────────────┐
│     VIEWPORT        │
│                     │
│                     │
│                     │
└─────────────────────┘

        ↓

┌─────────────────────┐
│      BOX            │
└─────────────────────┘
```

So:

``` text
entry.isIntersecting
```

is:

``` text
false
```

When you scroll down:

``` text
┌─────────────────────┐
│     VIEWPORT        │
│                     │
│      ┌─────────┐    │
│      │   BOX   │    │
│      └─────────┘    │
└─────────────────────┘
```

Now:

``` text
entry.isIntersecting
```

becomes:

``` text
true
```

and you get:

``` text
Box is visible!
```

------------------------------------------------------------------------

## Now understand the 3 important pieces

### 1. Create the observer

``` js
const observer = new IntersectionObserver((entries) => {

});
```

You're basically saying:

> "Browser, create an observer for me and tell me when something
> intersects the viewport."

------------------------------------------------------------------------

### 2. Tell it what to watch

``` js
observer.observe(box);
```

This means:

> "Watch this particular `box` element."

------------------------------------------------------------------------

### 3. Check whether it's visible

``` js
if (entry.isIntersecting) {
  console.log("Box is visible!");
}
```

That's the main property you'll use.
