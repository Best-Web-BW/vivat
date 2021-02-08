import ProfileMenu from "../../components/common/ProfileMenu";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { css, cx } from '@emotion/css';

const categoryOptions = [
    { value: 'chocolate', label: 'Скачки белых лошадей' },
    { value: 'strawberry', label: 'Гарцующий пони' },
    { value: 'vanilla', label: 'Самые быстрые скакуны' },
    { value: 'vanilla', label: 'Самая длинная грива' }
]

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  
  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );


export default function Registration() {
    return (
        <div className="profile-content content-block">
            <ProfileMenu active="registration" />
            <div className="block-title">
                <h2>Регистрация на событие</h2>
            </div>
            <div className="registration-content">
                <div className="left-column">
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Выбор события</p>
                        {/* <select className="select-event" defaultValue="1">
                            <option value="1">Скачки белых лошадей</option>
                            <option value="2">Гарцующий пони</option>
                            <option value="3">Самые быстрые скакуны</option>
                            <option value="4">Самая длинная грива</option>
                        </select> */}
                        <Select
                                    // defaultValue={colourOptions[1]}
                                    options={categoryOptions}
                                    formatGroupLabel={formatGroupLabel}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                          ...theme.colors,
                                          primary: '',
                                        },
                                      })}
                                      placeholder='Выберите из списка'
                                />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">ФИО всадника</p>
                        <input type="text" className="registration-element-input" placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Дата рождения всадника</p>
                        <input type="text" className="datepicker-here registration-element-input " placeholder="11.02.1996" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Страна/регион</p>
                        <input type="text" className="registration-element-input" placeholder="Россия, Москва" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">ФИО тренера</p>
                        <input type="text" className="registration-element-input" placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Контакты представителя</p>
                        <input type="text" className="registration-element-input" placeholder="+7(926) 000 00 00" />
                    </div>
                </div>
                <div className="right-column">
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Кличка лошади</p>
                        <input type="text" className="registration-element-input" placeholder={"Конак" || "Плотва" } />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Год рождения лошади</p>
                        <input type="text" className="registration-element-input" placeholder="1996" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Пол лошади</p>
                        <input type="checkbox" id="male" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="male">
                            М
                        </label>
                        <input type="checkbox" id="female" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="female">
                            Ж
                        </label>
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Паспорт ФСКР</p>
                        <input type="text" className="registration-element-input" placeholder="20090867" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Номер ФСКР</p>
                        <input type="text" className="registration-element-input" placeholder="4221" />
                    </div>
                    <div className="registration-element">
                        <span className="required">*</span>
                        <p className="registration-element-title">Нужен постой</p>
                        <input type="checkbox" id="male" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="male">
                            Да
                        </label>
                        <input type="checkbox" id="female" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="female">
                            Нет
                        </label>
                    </div>
                    <div className="registration-element" style={{ display: "none" }}>
                        <span className="required">*</span>
                        <p className="registration-element-title">C кормом</p>
                        <input type="checkbox" id="male" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="male">
                            Да
                        </label>
                        <input type="checkbox" id="female" className="custom-checkbox" />
                        <label className="gender-input" htmlFor="female">
                            Нет
                        </label>
                    </div>
                </div>
            </div>
            <div className="registration-row flex-row">
                <button className="registration-button">Зарегистрировать</button>
            </div>
        </div>
    );
}