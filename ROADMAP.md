# Tagalog Learning Platform - Technical Roadmap

This roadmap outlines the next 5 technical priorities to enhance the educational value of the platform, with a focus on 
implementing support for Tagalog's language focus system and adding essential learning components.

## Priority 1: Restructure Data Architecture

**Objective:** Reorganize static data into a well-structured, maintainable system without external dependencies.

**Tasks:**
- Create a `data/` directory to organize website content
- Maintain all data as static TypeScript/JSON files within the codebase
- Define TypeScript types in `/src/types/content.ts`

**Benefits:**
- Maintains all content within the codebase for complete control
- Organizes data in a logical, maintainable structure
- Improves code maintainability and separation of concerns

## Priority 2: Implement Language Focus Data Model

**Objective:** Create a comprehensive static data structure to support Tagalog's unique verb focus system (actor/object
focus).

**Tasks:**
- Design and implement the `TagalogVerb` interface with focus, aspect, and conjugation data
- Create a data module at `/src/data/verbs/` with:
  - TypeScript files for verb roots (e.g., `kain.ts`, `bili.ts`)
  - Conjugation rules and affix patterns as static data
  - Example sentences showing each focus type
- Develop utility functions for:
  - Generating conjugated forms
  - Finding verbs by meaning or focus type
  - Explaining focus selection in context

**Benefits:**
- Systematic approach to teaching one of Tagalog's most challenging aspects
- Foundation for interactive verb conjugation exercises
- Reusable data model for grammar reference and flashcards

## Priority 3: Build Flashcard System with Spaced Repetition

**Objective:** Implement a core language learning tool for vocabulary acquisition.

**Tasks:**
- Create a `Flashcard` component with front/back flipping animation
- Develop a spaced repetition algorithm (e.g., modified Leitner system)
- Implement progress tracking using localStorage
- Connect flashcards to the verb focus data model
- Add audio pronunciation support via Web Audio API

**Benefits:**
- Essential tool for vocabulary retention
- Can be used for both words and verb conjugations
- Personalized learning based on user performance
- Offline functionality for learning anywhere

## Implementation Strategy

1. **Sequential Approach:** Complete each priority before moving to the next, as each builds on the previous one.

2. **Data-First Philosophy:** Prioritize data modeling (Priorities 1-2) before UI components (Priority 3) to ensure a
solid foundation.

3. **User-Centric Development:** After implementing each priority, conduct user testing to validate effectiveness.

4. **Incremental Release:** Deploy each completed feature to production to gather real-user feedback early.

This roadmap provides a clear path forward to transform the current content display platform into a comprehensive, 
interactive Tagalog learning system with all content self-contained as static data within the codebase.