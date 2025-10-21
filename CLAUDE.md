# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Crypt X is a cryptocurrency tax calculation service designed for Korean users. The application helps users calculate capital gains tax (양도소득세) on cryptocurrency transactions across multiple exchange types:

- **Domestic Exchanges (국내 거래소)**: Upbit, Bithumb, Korbit, Coinone
- **International Exchanges (해외 거래소)**: Binance, Coinbase, OKX, Bitget, HTX, MEXC, Gate, Kucoin, Bitfinex, Kraken
- **DEX Platforms**: PUMP, Hyper Liquide, Pancake, Curve, Uniswap

## Core Functionality

The application processes financial statements from various exchanges and calculates:

1. **Income Categories**:
   - Capital gains (양도소득)
   - Staking income (스테이킹)
   - Airdrops (에어드랍)
   - Interest (이자)

2. **Tax Calculation**:
   - Total income aggregation
   - Basic deduction (기본공제): 2,500,000 KRW
   - Taxable amount (과세표준) calculation
   - Income tax (소득세): 20% rate
   - Local income tax (지방소득세): 10% of income tax
   - Total tax amount (총 세액)

## File Processing

The application accepts multiple file formats:
- **XLSX** (Excel files)
- **PDF** documents

Users upload financial statements per exchange, and the system processes them to extract transaction data.

## Application Flow

1. **Sign In/Sign Up**: User authentication
2. **Service Selection**: Choose exchange types (domestic, international, DEX)
3. **File Upload**: Upload financial statements for each selected exchange
4. **Processing**: System calculates tax obligations
5. **Results Display**: Shows preliminary calculation with expert review pending
6. **Final Package**: Delivers reviewed calculation package

## UI/UX Notes

- Korean language interface (한국어)
- Purple/pink gradient theme
- Multi-step wizard flow
- Exchange categorization with visual tabs
- File upload status tracking
- Expert review workflow for accuracy verification

## Development Considerations

When implementing this application:

- Support both Korean and potentially English localization
- Handle multiple file format parsers (XLSX, PDF) for transaction data extraction
- Implement secure file upload and storage
- Build a multi-step form wizard with progress tracking
- Create exchange-specific data parsers (each exchange has different export formats)
- Implement tax calculation engine following Korean tax law for cryptocurrency
- Build expert review/approval workflow system
- Ensure data privacy and security for financial information
