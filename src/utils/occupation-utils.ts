export type Occupation = {
  value: string,
  text: string,
}

export const getOccupationById = (
  occupations: Occupation[],
  id: string,
) => {
  return occupations.find((occupation) => occupation.value === id)
}

export const OCCUPATION_MOCKS: Occupation[] = [{"value":"1","text":"Администрация"},{"value":"2","text":"Банковский служащий"},{"value":"3","text":"Бухгалтерия, финансы и планирование"},{"value":"4","text":"Вспомогательный технический персонал"},{"value":"5","text":"Закупки, снабжение работа с поставщиками"},{"value":"6","text":"Кадровая служба и секретариат"},{"value":"7","text":"Клиентское обслуживание, продажи"},{"value":"8","text":"Отдел кадров и секритариат, тренинги, преподавание"},{"value":"9","text":"Пр.-тех. Обеспечение, телекоммуникации"},{"value":"10","text":"Производство"},{"value":"11","text":"Развитие и исследование, разработки"},{"value":"12","text":"Реклама и маркетинг"},{"value":"13","text":"Служба безопасности"},{"value":"14","text":"Участие в основной деятельности"},{"value":"15","text":"Хозяйственная деятельность, транспорт"},{"value":"16","text":"Юридическая служба"},{"value":"17","text":"Другое"}]
