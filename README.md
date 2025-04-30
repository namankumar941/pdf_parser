# PDF Parser Application

## Overview

This application is a sophisticated PDF processing tool that converts PDF documents into structured, accessible formats with enhanced features for data visualization and interaction. It integrates multiple AI capabilities through various API providers (OpenAI, Claude, and Mistral) for intelligent PDF content processing.

## Project Structure

```
pdf_parser/
├── class/
│   ├── claudeAiApi.js       # Claude AI API integration
│   ├── mistralApi.js        # Mistral AI API integration
│   ├── openAiApi.js         # OpenAI API integration
│   ├── pageview.js          # Page view handling
│   ├── replaceImageTag.js   # Image processing utilities
│   └── validationClass.js   # Input validation
├── prompt/
│   ├── Implementation.js
│   ├── codeRepresentation.js
│   ├── dataVerify.js
│   ├── displayImage.js
│   ├── example.js
│   ├── functionality.js
│   ├── mathematicalFormulas.js
│   ├── navigationBar.js
│   ├── newFinalPrompt.js
│   ├── outputFormat.js
│   └── tableDisplay.js
├── views/
│   ├── pdfView.ejs         # PDF viewing template
│   └── uploadPdf.ejs       # PDF upload interface
└── index.js               # Main application entry point
```

## Features

1. **Multi-AI Provider Support**

   - OpenAI integration
   - Claude AI integration
   - Mistral AI integration

2. **Advanced PDF Processing**

   - Text extraction and analysis
   - Image processing and handling
   - Mathematical formula recognition
   - Table detection and structured representation

3. **User Interface**

   - Intuitive PDF upload interface
   - Interactive PDF viewer
   - Navigation controls
   - Responsive design

4. **Data Processing**
   - Input validation
   - Content verification
   - Structured output formatting
   - Image tag processing

## Technical Stack

- **Backend**: Node.js
- **Frontend**: EJS templating engine
- **AI Services**:
  - OpenAI API
  - Claude AI API
  - Mistral AI API
- **PDF Processing**: Custom implementation

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure API keys for:

   - OpenAI
   - Claude AI
   - Mistral AI

4. Start the application:
   ```bash
   npm start
   # or
   yarn start
   ```

## Usage

1. Access the application through the web interface
2. Upload a PDF file using the upload interface
3. The system will process the PDF and provide:
   - Text extraction
   - Image processing
   - Mathematical formula recognition
   - Table structure recognition
4. View the processed content in a structured, accessible format

## Key Components

### AI Integration Classes

#### OpenAI API Integration (`openAiApi.js`)

The OpenAI API integration serves as a primary engine for advanced text analysis and processing:

- **PDF Text Analysis**: Processes extracted PDF text using GPT models for enhanced understanding
- **Content Structuring**: Converts raw PDF content into well-structured, semantic sections
- **Table Recognition**: Uses GPT-4 Vision capabilities to analyze and extract tabular data
- **Mathematical Expression Processing**: Identifies and formats mathematical equations
- **Context Awareness**: Maintains conversation context for improved content processing
- **Error Handling**: Robust error management for API rate limits and token limitations

#### Claude AI API Integration (`claudeAiApi.js`)

Claude AI serves as a specialized processor for complex document understanding:

- **Long-form Content Analysis**: Handles large chunks of PDF text with high context retention
- **Document Structure Analysis**: Identifies document hierarchies and relationships
- **Cross-reference Processing**: Manages internal document references and citations
- **Technical Content Understanding**: Specialized in processing technical and scientific content
- **Multi-language Support**: Processes content in various languages with high accuracy
- **Contextual Understanding**: Maintains document context across multiple processing requests

#### Mistral AI API Integration (`mistralApi.js`)

Mistral AI provides specialized capabilities for specific document processing tasks:

- **Fast Processing**: Optimized for quick analysis of shorter text segments
- **Format Detection**: Identifies specific document formats and structures
- **Code Block Processing**: Specialized in identifying and formatting code snippets
- **List Recognition**: Advanced detection and structuring of bulleted and numbered lists
- **Metadata Extraction**: Pulls out document metadata and key information
- **Lightweight Processing**: Efficient processing for less complex document sections

### Validation System

The application implements a comprehensive validation system using multiple approaches to ensure data integrity and output reliability:

#### Schema Validation with Zod

- **Type Safety**: Uses Zod for runtime type checking and validation
- **Custom Schemas**: Implements specific schemas for:
  - PDF content structure
  - API responses
  - Mathematical formula formats
  - Table structures
- **Error Handling**: Provides detailed error messages for validation failures

#### HTML Output Validation (`validationClass.js`)

- **Structure Verification**: Ensures proper HTML document structure
  - Validates DOCTYPE declaration
  - Checks for complete HTML tags
  - Verifies document completeness
- **Content Integrity**: Validates generated HTML content
  - Ensures proper nesting of elements
  - Validates image tag replacements
  - Checks for malformed content

#### Multi-level Validation Pipeline

1. **Processing Validation**

   - API response validation
   - Content transformation verification
   - Structure preservation checks

2. **Output Validation**
   - Format consistency checks
   - Cross-reference verification
   - Final structure validation

### Processing Components

- `pageview.js`: Manages PDF page viewing and navigation
- `replaceImageTag.js`: Handles image processing and replacement
- `validationClass.js`: Ensures data integrity and validation

### Prompt Management

The `prompt/` directory contains various prompt templates and handlers for:

- Implementation guidelines
- Code representation
- Data verification
- Image display
- Mathematical formula processing
- Navigation controls
- Table display formatting

### Views

- `pdfView.ejs`: Renders processed PDF content
- `uploadPdf.ejs`: Provides the upload interface
