import pandas as pd

# Create a comprehensive property data summary
property_data = {
    'Property Details': [
        'PPIN 043387',
        'Parcel 2303064001016.000', 
        '0.28 acres',
        '95\' X 200\' irregular lot',
        'Fulton Street, Florence AL',
        'Vacant Land',
        'SW/4 of SE/4 of Section 6'
    ],
    'Values': [
        'County Identifier',
        'Legal Parcel Number',
        'Total Property Size',
        'Lot Dimensions', 
        'Property Address',
        'Current Use',
        'Legal Description'
    ]
}

ownership_data = {
    'Ownership Information': [
        'Herman Blevins & Glenda Blevins',
        'C/O Pamela Williams',
        '600 Firestone Ave Apt 411',
        'Muscle Shoals AL 35661',
        'Glenda deceased 12/24/2020',
        'Herman status unknown'
    ],
    'Details': [
        'Joint owners (ETUX designation)',
        'Property contact person',
        'Mailing address for property',
        'Apartment complex location',
        'Property co-owner deceased',
        'Co-owner current status unclear'
    ]
}

financial_data = {
    'Financial Information': [
        '$2,400',
        '$480', 
        '$24',
        'Tax Year 2022',
        'No outstanding liens',
        'No foreclosure issues'
    ],
    'Description': [
        'Total appraised value',
        'Assessed value',
        'Annual property tax',
        'Current tax assessment year',
        'Clean title status',
        'Current on payments'
    ]
}

# Create DataFrames
property_df = pd.DataFrame(property_data)
ownership_df = pd.DataFrame(ownership_data)
financial_df = pd.DataFrame(financial_data)

# Save to CSV files
property_df.to_csv('fulton_street_property_details.csv', index=False)
ownership_df.to_csv('fulton_street_ownership_info.csv', index=False)
financial_df.to_csv('fulton_street_financial_data.csv', index=False)

print("Property Details Summary:")
print(property_df.to_string(index=False))
print("\n" + "="*50)
print("\nOwnership Information:")
print(ownership_df.to_string(index=False))
print("\n" + "="*50)
print("\nFinancial Information:")
print(financial_df.to_string(index=False))

# Create a timeline of key events
timeline_data = {
    'Date': [
        '2018-09-12',
        '2019-07',
        '2020-12-24',
        '2022',
        '2024',
        '2025-06-05'
    ],
    'Event': [
        '600 Firestone Ave property sold for $13.9M',
        'Pamela & Phillip Williams move to 600 Firestone Ave',
        'Glenda Blevins dies at age 79',
        'Property taxes current, Pamela Williams still listed as contact',
        'Property assessment remains $2,400',
        'Investigation confirms connections'
    ],
    'Significance': [
        'Large apartment complex where Williams live',
        'Establishes residency at current address', 
        'Property owner dies, estate management needed',
        'Ongoing property management arrangement',
        'Property value stable, no development',
        'Property connection definitively established'
    ]
}

timeline_df = pd.DataFrame(timeline_data)
timeline_df.to_csv('fulton_street_timeline.csv', index=False)

print("\n" + "="*50)
print("\nKey Timeline Events:")
print(timeline_df.to_string(index=False))