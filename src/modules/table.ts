export const useTable = (cols: any, freeze: any = []) => {
  const colFreezes = () => {
    // Clear previous freeze styles
    clearFreezeStyles();

    resetFreezes(freeze);
    freeze = [];

    for (let i = 0; i < cols.length; i++) {
      if (cols[i].freeze) {
        freeze.push({
          child: i + 1,
          width: Number(cols[i].minWidth?.split('px')[0])
        });
      }
    }

    // Create a single style element for all freeze styles
    let style = document.createElement('style');
    let styleContent = '';

    for (let f = 0; f < freeze.length; f++) {
      let width: number = f < 1 ? 0 : 
                          f === 1 ? Number(freeze[f - 1]?.width) : 
                          colWidth(f, freeze);

      styleContent += `
        .bh-table-responsive table > thead > tr > th:nth-child(${freeze[f].child}),
        .bh-table-responsive table > tbody > tr > td:nth-child(${freeze[f].child}),
        .bh-table-responsive table > tfoot > tr > th:nth-child(${freeze[f].child}) {
          position: sticky;
          left: ${width}px;
        }
        
        .bh-table-responsive table > thead > tr > th:nth-child(${freeze[f].child}) {
          z-index: 2;
        }

        .bh-table-responsive table > tbody > tr > td:nth-child(${freeze[f].child}) {
          z-index: 1;
        }

        .bh-table-responsive table > tfoot > tr > th:nth-child(${freeze[f].child}) {
          z-index: 2;
        }


        .bh-table-responsive table > thead > tr > th:nth-child(${freeze[freeze.length - 1].child}),
        .bh-table-responsive table > tbody > tr > td:nth-child(${freeze[freeze.length - 1].child}) {
          position: sticky;
          right: 0px;
        }

        .bh-table-responsive table > thead > tr > th:nth-child(${freeze[freeze.length - 1].child}) {
          z-index: 2;
        }

        .bh-table-responsive table > tbody > tr > td:nth-child(${freeze[freeze.length - 1].child}) {
          z-index: 1;
        }
      `;
    }

    style.innerHTML = styleContent;
    style.setAttribute('data-freeze-styles', ''); // Add a custom attribute for easy identification
    document.head.appendChild(style);
  };

  const colWidth = (index: any, data: any) => {
    data = data.filter((item: any, i: any) => i < index);

    return data.reduce((accumulator, current) => accumulator + current.width, 0);
  };

  const resetFreezes = (freeze: any = []) => {
    // loop stylesheet
    for (let f = 0; f < freeze.length; f++) {
      let style = document.createElement('style');
      
      // reset stylesheet to auto
      style.innerHTML = `
        .bh-table-responsive table thead > tr > th, 
        .bh-table-responsive table tbody > tr > td,
        .bh-table-responsive table tfoot > tr > th {
          position: unset;
        }
        
        .table-grid table > thead > tr > th:nth-child(${freeze[f].child}) {
          left: auto;
          z-index: auto;
        }

        .table-grid table > tbody > tr > td:nth-child(${freeze[f].child}) {
          left: auto;
          z-index: auto;
        }

        .table-grid table > tfoot > tr > th:nth-child(${freeze[f].child}) {
          left: auto;
          z-index: auto;
        }
      `;

      // add to appendchild
      document.head.appendChild(style);
    }
  };

  const clearFreezeStyles = () => {
    const oldStyles = document.head.querySelectorAll('style[data-freeze-styles]');
    oldStyles.forEach(style => style.remove());
  };

  return {
    colFreezes
  };
};