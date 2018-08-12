export const getAll = () =>
  Promise.resolve([
    {id: '123',
      shelf: 'currentlyReading',
      title: 'React Trainning',
      authors: ['Fabiano Beselga']},
    {id: '321',
      shelf: 'currentlyReading',
      title: 'A book with string as author',
      authors: 'I am a string'
    }])


export const update = () =>
  console.log('update')
