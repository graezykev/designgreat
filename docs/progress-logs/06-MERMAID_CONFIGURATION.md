# Mermaid Configuration Guide

## ✅ Configuration Complete

Mermaid diagram support has been successfully added to Docusaurus!

### Changes Made

**1. Package Installed:**

```json
{
  "dependencies": {
    "@docusaurus/theme-mermaid": "3.9.2"
  }
}
```

**2. Docusaurus Config Updated:**

```typescript
themes: [
  '@docusaurus/theme-mermaid',  // ← Added
  // ... other themes
],

markdown: {
  mermaid: true  // ← Added
},
```

## 📝 How to Use Mermaid

### Basic Syntax

Use triple backticks with `mermaid` language:

````markdown
```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
```
````

### Example Diagrams for Theme-Aware Colors

#### 1. Color System Architecture

````markdown
```mermaid
flowchart LR
    A[Base Colors<br/>#0055cc] --> B[Gradient Levels<br/>1-10 or 1-12]
    B --> C[Semantic Aliases<br/>bold, DEFAULT, subtle]
    C --> D[Theme-Aware UI]

    style A fill:#0055cc,color:#fff
    style B fill:#e6f2ff,color:#000
    style C fill:#3388ff,color:#fff
    style D fill:#599eff,color:#fff
```
````

#### 2. Fixed vs Switchable Flow

````markdown
```mermaid
flowchart TD
    Base[Base Colors<br/>Fixed Seeds] --> Fixed[Gradient Levels<br/>1-12, 1-10<br/>Fixed Values]
    Fixed --> Aliases[Semantic Aliases<br/>bold, DEFAULT, subtle<br/>Switchable Mappings]

    Aliases --> Light[Light Theme<br/>Maps to darker levels]
    Aliases --> Dark[Dark Theme<br/>Maps to lighter levels]

    style Base fill:#1d1d1f,color:#fff
    style Fixed fill:#4c4c51,color:#fff
    style Aliases fill:#3388ff,color:#fff
    style Light fill:#e8e8e9,color:#000
    style Dark fill:#0c0c0d,color:#fff
```
````

#### 3. Theme Switching Hierarchy

````markdown
```mermaid
graph TB
    subgraph "Fixed Layer"
        A[base.grey<br/>#1d1d1f]
        B[base.blue<br/>#0055cc]
    end

    subgraph "Gradient Layer (Fixed)"
        C[grey.1 to grey.12]
        D[blue.1 to blue.10]
    end

    subgraph "Alias Layer (Switchable)"
        E[grey.bold]
        F[grey.DEFAULT]
        G[grey.subtle]
    end

    A --> C
    B --> D
    C --> E
    C --> F
    C --> G

    E --> |Light| H[Level 12]
    E --> |Dark| I[Level 1]

    style A fill:#1d1d1f,color:#fff
    style B fill:#0055cc,color:#fff
```
````

#### 4. Simple Linear Flow

````markdown
```mermaid
flowchart LR
    A[Define base colors once] --> B[Generate gradient palette]
    B --> C[Apply semantic meaning]
    C --> D[Automatic theming]

    style A fill:#0055cc,color:#fff
    style B fill:#3388ff,color:#fff
    style C fill:#599eff,color:#fff
    style D fill:#8db3ff,color:#000
```
````

## 🎨 Suggested Placements

### theme-aware-colors.mdx

Add this diagram under "Two-Layer Architecture":

````markdown
## Two-Layer Architecture

The Design Great color system is built on **base colors** and uses a **two-layer architecture**:

```mermaid
flowchart TB
    subgraph Foundation
        A[Base Colors<br/>e.g., base.blue #0055cc]
    end

    subgraph "Layer 1: Fixed Palette"
        B[Gradient Levels 1-10/1-12<br/>Constant hex values]
    end

    subgraph "Layer 2: Smart Aliases"
        C[Semantic Aliases<br/>bold, DEFAULT, subtle, etc.]
    end

    subgraph Themes
        D[Light Theme<br/>Maps to darker levels]
        E[Dark Theme<br/>Maps to lighter levels]
    end

    A --> B
    B --> C
    C --> D
    C --> E

    style A fill:#0055cc,color:#fff
    style B fill:#3388ff,color:#fff
    style C fill:#599eff,color:#fff
    style D fill:#e8e8e9,color:#000
    style E fill:#1d1d1f,color:#fff
```
````

### accent-colors.mdx

Add this under "Theme Adaptation":

````markdown
```mermaid
graph LR
    A[Gradient Level<br/>grey.11 #1d1d1f] --> |Fixed| B[Same in both themes]
    C[Semantic Alias<br/>grey.DEFAULT] --> |Light| D[#1d1d1f level 11]
    C --> |Dark| E[#e8e8e9 level 2]

    style A fill:#4c4c51,color:#fff
    style B fill:#4c4c51,color:#fff
    style C fill:#3388ff,color:#fff
    style D fill:#1d1d1f,color:#fff
    style E fill:#e8e8e9,color:#000
```
````

## 📚 Mermaid Resources

- [Mermaid Official Docs](https://mermaid.js.org/)
- [Flowchart Syntax](https://mermaid.js.org/syntax/flowchart.html)
- [Graph Syntax](https://mermaid.js.org/syntax/graph.html)
- [Styling](https://mermaid.js.org/syntax/flowchart.html#styling-and-classes)

## 🚀 Next Steps

1. Start the dev server: `pnpm dev`
2. Add Mermaid diagrams to your documentation
3. Test that they render correctly in both light and dark themes
4. Adjust colors/styling as needed

## 🎨 Theme-Aware Styling

Mermaid diagrams inherit the site's theme. You can customize colors:

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#0055cc'}}}%%
graph LR
    A[Custom Colors] --> B[Matches Design System]
```

## ✅ Validation

To verify Mermaid is working:

1. Run `pnpm dev`
2. Navigate to any page with a Mermaid diagram
3. Check that the diagram renders correctly
4. Switch between light/dark themes to verify appearance

---

**Status:** ✅ CONFIGURED **Package:** @docusaurus/theme-mermaid@3.9.2 **Documentation:** Ready to
use Mermaid diagrams!
