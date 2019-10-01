//   Use jquery datatable feature to build in a master search feature
// and build a column-specific search box for all columns in the table, that also has a sort feature, at the top of the table
$('#real-table thead th').each( function () {
    var title = $('#real-table tfoot th').eq( $(this).index() ).text();
    $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
} );

// DataTable
var table = $('#real-table').DataTable();

// Apply the search
table.columns().eq( 0 ).each( function ( colIdx ) {
    $( 'input', table.column( colIdx ).header() ).on( 'keyup change', function () {
        table
            .column( colIdx )
            .search( this.value )
            .draw();
    } );
} );

// Keep the column headers on top
$('#real-table tfoot tr').appendTo('#real-table thead');