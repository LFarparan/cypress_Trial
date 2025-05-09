describe.skip('Verify that the webpage loads properly', () => {
    it('Should successfully visit the website', () => {
        cy.viewport(850, 650)
        cy.visit('https://datatables.net/')
        cy.get('.nav-master > .active > a').should('exist')
    })
})


describe.skip("Verify the table's pagination", () => {
    beforeEach(() => {
        cy.viewport(850, 650)
        cy.visit('https://datatables.net/')
    })

    it('Should have a default of 10 table rows', () => {
        cy.get('#dt-length-0').select('10')
        cy.get('table#example tbody tr').should('exist').and('have.length', 10)
    })

    it('Should have 25 entries when Entries per page is set to 25', () => {
        cy.get('#dt-length-0').select('25')
        cy.get('table#example tbody tr').should('exist').and('have.length', 25)
    })

    it('Should have 50 entries when Entries per page is set to 50', () => {
        cy.get('#dt-length-0').select('50')
        cy.get('table#example tbody tr').should('exist').and('have.length', 50)
    })

    it('Should have 100 entries when Entries per page is set to 100', () => {
        cy.get('#dt-length-0').select('100')
        cy.get('table#example tbody tr').should('exist').and('have.length', 57)
    })
})

describe.skip('Verify the table sort functionality', () => {
    beforeEach(() => {
        cy.viewport(850, 650)
        cy.visit('https://datatables.net/')
    })

    it('Should sort by Names in alphabetical order', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all name values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                tableNames.push(Cypress.$(row).find('td').eq(0).text());
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort())
        })
    })

    it('Should sort by Position in alphabetical order', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all position values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(1).text()
                if (!tableNames.includes(name)) {
                    tableNames.push(name);
                }
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort())
        })
    })

    it('Should sort by Office in alphabetical order', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all office values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(2).text()
                if (!tableNames.includes(name)) {
                    tableNames.push(name);
                }
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort())
        })
    })

    it('Should sort by Age', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all age values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(3).text()
                if (!tableNames.includes(name)) {
                    tableNames.push(name);
                }
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort())
        })
    })

    it('Should sort by Date', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all date values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(4).text()
                if (!tableNames.includes(name)) {
                    tableNames.push(name);
                }
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort((a, b) => new Date(a) - new Date(b)))
        })
    })


    it('Should sort by Salary', () => {
        const tableNames = []
        cy.get('#dt-length-0').select('100')

        // get all salary values inside an array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(5).text()
                if (!tableNames.includes(name)) {
                    tableNames.push(name);
                }
            })
            cy.wrap(tableNames).as('tableNames'); // Store it for later use
        })

        // check if the array is sorted alphabetically
        cy.get('@tableNames').then((names) => {
            cy.wrap(names).should('deep.equal', names.sort((a, b) => {
                const numA = parseFloat(a.replace(/[$,]/g, ''));
                const numB = parseFloat(b.replace(/[$,]/g, ''));
                return numA - numB;
            }))
        })
    })
})


describe('Verify searching feature', () => {
    beforeEach(() => {
        cy.viewport(850, 650)
        cy.visit('https://datatables.net/')
    })

    it('Should filter using Name', () => {
        cy.get('#dt-search-0').type('Bruno Nash')
        cy.get('.dtr-control').should('contain', 'Bruno Nash')
        
    })

    it('Should filter all software engineers', () => {
        const tableNames = []

        cy.get('#dt-search-0').type('Software Engineer')
        // get all positions inside the array
        cy.get('table#example tbody tr').then(($rows) => {
            $rows.each((index, row) => {
                tableNames.push(Cypress.$(row).find('td').eq(1).text())
            })

            // check if all array elements are the same
            cy.wrap(tableNames.every(item => item === tableNames[0])).should('be.true');
        })
    })
})