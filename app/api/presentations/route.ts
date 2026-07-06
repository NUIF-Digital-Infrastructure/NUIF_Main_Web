import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const presentationsDir = join(process.cwd(), 'public', 'presentations');
    const files = await readdir(presentationsDir);
    const excludedPresentationFiles = new Set([
      // Temporarily disable this report from loading on the website.
      'NUIF_NUIF-Semester-One-Report-2025-26_29-01-2026.pdf'
    ]);
    const companyDisplayOverrides: Record<string, string> = {
      'Team-Energy_Ørsted-A_S_15-03-2026': 'Ørsted A/S'
    };
    const pad = (value: number) => value.toString().padStart(2, '0');
    const parseDatePart = (datePart: string) => {
      const [dayStr, monthStr, yearStr] = datePart.split('-');
      const day = Number(dayStr);
      const month = Number(monthStr);
      let year = Number(yearStr);
      if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
        throw new Error(`Invalid date segment in filename: ${datePart}`);
      }
      if (year < 100) {
        year += 2000; // Treat two-digit years as 20xx rotations
      }
      const timestamp = new Date(year, month - 1, day).getTime();
      return {
        day,
        month,
        year,
        formatted: `${pad(day)}/${pad(month)}/${year}`,
        sortable: `${year}-${pad(month)}-${pad(day)}`,
        timestamp
      };
    };
    
    // Filter PDF files and extract information
    const presentations = files
      .filter(file => file.endsWith('.pdf'))
      .filter(file => !excludedPresentationFiles.has(file))
      .map((file) => {
        // Extract team name and company from filename
        // Format: TeamName_CompanyName_DD-MM-YYYY.pdf
        const withoutExt = file.replace('.pdf', '');
        const parts = withoutExt.split('_');
        
        // Get date from last part (DD-MM-YYYY or DD-MM-YY format)
        const datePart = parts[parts.length - 1];
        const parsedDate = parseDatePart(datePart);
        
        // Get team name (first part)
        const team = parts[0];
        
        // Get company name (everything between team and date)
        const company = parts.slice(1, -1).join(' ');

        const companyDisplay = companyDisplayOverrides[withoutExt] ?? company.replaceAll('-', ' ');
        let title = companyDisplay;

        if (withoutExt === 'NUIF_NUIF-Semester-One-Report-2025-26_29-01-2026') {
          title = 'NUIF Semester One Report 2025/26';
        }
        
        // Check if PNG thumbnail exists with same filename
        const thumbnailFileName = `${withoutExt}.png`;
        const thumbnailPath = join(process.cwd(), 'public', 'presentations', thumbnailFileName);
        const hasThumbnail = existsSync(thumbnailPath);
        
        return {
          id: withoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          team: team.replaceAll('-', ' '),
          company: companyDisplay,
          title,
          subtitle: `Investment Analysis by ${team.replaceAll('-', ' ')}`,
          pdfPath: `/presentations/${file}`,
          thumbnailPath: hasThumbnail ? `/presentations/${thumbnailFileName}` : `/presentations/${withoutExt}.png`,
          dateFormatted: parsedDate.formatted,
          sortDate: parsedDate.sortable,
          sortTimestamp: parsedDate.timestamp
        };
      })
      .sort((a, b) => b.sortTimestamp - a.sortTimestamp);
    
    // Group by exact date (DD/MM/YYYY)
    const grouped = presentations.reduce((acc, presentation) => {
      const dateKey = presentation.dateFormatted;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(presentation);
      return acc;
    }, {} as Record<string, typeof presentations>);

    const groupedList = Object.entries(grouped)
      .map(([date, items]) => {
        const [day, month, year] = date.split('/').map(Number);
        const sortValue = new Date(year, month - 1, day).getTime();
        return { date, presentations: items, sortValue };
      })
      .sort((a, b) => b.sortValue - a.sortValue)
      .map(({ date, presentations }) => ({ date, presentations }));
    
    return NextResponse.json({ presentations, grouped, groupedList });
  } catch (error) {
    console.error('Error reading presentations:', error);
    return NextResponse.json({ error: 'Failed to read presentations' }, { status: 500 });
  }
}
