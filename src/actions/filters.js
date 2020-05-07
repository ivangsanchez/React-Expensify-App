////////////////SETTEXTFILTER/////////////////////////////
export const setTextFilter = (text = '') =>({
    type:'SET_TEXT_FILTER',
    text
});

//////////////SORT BY AMOUNT//////////////////

export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//////////////SORT BY DATE//////////////////
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

//////////////////// SET_START DATE ////////////
export const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
})

//////////////////// SET_END DATE ////////////
export const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
})
