export const TableStyle = {
    base_bg_color: 'bg-neutral-700',
    base_text_color: 'text-neutral-100', //defaults to text-pink-700
    main: 'bg-neutral-800', //The container holding the table
    top: {
        title: '',
        elements: {
            // The elements include the search, bulk select and csv download components
            main: 'bg-neutral-800', //The row holding these components
            search: 'bg-neutral-300 text-neutral-200', //The search input
            bulk_select: {
                main: '', // styling targets the dropdown
                button: '', // styling targets the button
            },
            export: 'bg-red-600 text-red-100 px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 hover:text-red-200',
        },
    },
    table_head: {
        table_row: '', // The <tr/> holding all <th/>
        table_data: '', // each table head column
    },
    table_body: {
        main: '', //main here targets <tbody/>
        table_row: '',
        table_data: '',
    },
    footer: {
        main: '', // row holding the footer
        statistics: {
            // those shiny numbers like **Showing 1 to 5 of 58 entries**
            main: '',
            bold_numbers: '', //The numbers like 1, 5, 58
        },
        page_numbers: '', //the number boxes
    },
}
