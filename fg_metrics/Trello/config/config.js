var config = {
    teams: {
        dataScrubbers: {
            teamName: 'Data_Scrubbers',
            key: '68b96eeaad12e1cd6c22742f48289557',
            token: 'c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5',
            boardId: '5a2571728cac5d5f36ba5e5e',
            acceptedListInt: 0, //This is the iterator for accepted columns. 0 will get most current accepted list and 1 would get second.
            path: './Files/CTLDA/DataScrubbers/Exports/'
        },
        noJS: {
            teamName: 'NoJs',
            key: '68b96eeaad12e1cd6c22742f48289557',
            token: 'c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5',
            boardId: '59395d4f04c5416b8e7ed9a9',
            acceptedListInt: 0, //This is the iterator for accepted columns. 0 will get most current accepted list and 1 would get second.
            path: './Files/CTLDA/NoJS/Exports/'
        },
        lac: {
            teamName: 'LACD',
            key: '68b96eeaad12e1cd6c22742f48289557',
            token: 'c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5',
            boardId: '5a7dd1e8a8fca8c51103c593',
            acceptedListInt: 0, //This is the iterator for accepted columns. 0 will get most current accepted list and 1 would get second.
            path: './Files/CTLDA/LACD/Exports/'
        }
    },
    
}

module.exports = config;