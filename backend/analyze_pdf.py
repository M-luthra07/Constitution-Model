import fitz  # PyMuPDF
import json
import re

def analyze_pdf(pdf_path, output_json):
    try:
        doc = fitz.open(pdf_path)
        print(f"Total Pages: {doc.page_count}")
        
        toc_entries = []
        
        # Standard Constitution Parts
        parts_map = {
            "PART I": "The Union and its Territory",
            "PART II": "Citizenship",
            "PART III": "Fundamental Rights",
            "PART IV": "Directive Principles of State Policy",
            "PART IVA": "Fundamental Duties",
            "PART V": "The Union",
            "PART VI": "The States",
            "PART VII": "The States in Part B of the First Schedule",
            "PART VIII": "The Union Territories",
            "PART IX": "The Panchayats",
            "PART IXA": "The Municipalities",
            "PART IXB": "The Co-operative Societies",
            "PART X": "The Scheduled and Tribal Areas",
            "PART XI": "Relations between the Union and the States",
            "PART XII": "Finance, Property, Contracts and Suits",
            "PART XIII": "Trade, Commerce and Intercourse within the Territory of India",
            "PART XIV": "Services Under the Union and the States",
            "PART XIVA": "Tribunals",
            "PART XV": "Elections",
            "PART XVI": "Special Provisions Relating to Certain Classes",
            "PART XVII": "Official Language",
            "PART XVIII": "Emergency Provisions",
            "PART XIX": "Miscellaneous",
            "PART XX": "Amendment of the Constitution",
            "PART XXI": "Temporary, Transitional and Special Provisions",
            "PART XXII": "Short Title, Commencement, Authoritative Text in Hindi and Repeals"
        }

        # Regex to find "PART X"
        part_pattern = re.compile(r"PART\s+([IVX]+[AB]?)", re.IGNORECASE)
        
        # We want to find the *actual* start of the parts, which is likely after the TOC.
        # The TOC usually lists them with page numbers, but the actual content has them as headers.
        # A simple heuristic: The TOC pages usually have many "PART" occurrences or dots "......"
        # The content pages usually have "PART X" followed by a title.
        
        found_parts = {}

        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            text = page.get_text("text")
            
            # Check for Preamble
            if "WE, THE PEOPLE OF INDIA" in text and "PREAMBLE" in text:
                 if "Preamble" not in found_parts:
                     found_parts["Preamble"] = page_num + 1

            lines = text.split('\n')
            for i, line in enumerate(lines):
                clean_line = line.strip().upper()
                match = part_pattern.match(clean_line)
                if match:
                    part_num = match.group(1)
                    key = f"PART {part_num}"
                    
                    # Heuristic: If we found it already, update it only if the new page is significantly later
                    # (assuming the first ones were TOC). 
                    # OR, we can just take the last occurrence? No, the last occurrence might be an index.
                    # The content usually starts after page 20-30.
                    
                    if page_num > 20: # Skip likely TOC pages
                        if key not in found_parts:
                             found_parts[key] = page_num + 1
        
        # Construct final list
        final_toc = []
        if "Preamble" in found_parts:
            final_toc.append({"title": "Preamble", "page": found_parts["Preamble"]})
            
        # Sort by Roman numerals is hard, so let's iterate through our known map
        roman_order = ["PART I", "PART II", "PART III", "PART IV", "PART IVA", "PART V", "PART VI", 
                       "PART VII", "PART VIII", "PART IX", "PART IXA", "PART IXB", "PART X", 
                       "PART XI", "PART XII", "PART XIII", "PART XIV", "PART XIVA", "PART XV", 
                       "PART XVI", "PART XVII", "PART XVIII", "PART XIX", "PART XX", "PART XXI", "PART XXII"]
                       
        for key in roman_order:
            if key in found_parts:
                title = parts_map.get(key, key)
                final_toc.append({"title": f"{key} - {title}", "page": found_parts[key]})
        
        # Schedules
        # Add logic for Schedules if needed, but Parts are main.
        
        print(f"Generated TOC with {len(final_toc)} entries.")
        
        with open(output_json, 'w') as f:
            json.dump(final_toc, f, indent=2)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_pdf("20240716890312078.pdf", "static/toc.json")
