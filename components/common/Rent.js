import { DefaultErrorModal, ErrorModal, SuccessModal } from "./Modals";
import AuthProvider from "../../utils/providers/AuthProvider";
import MailProvider from "../../utils/providers/MailProvider";
import { toRuDate } from "../../utils/common";
import Select from 'react-select';
import DatePicker from "./DatePicker";
import { useEffect, useState } from "react";

const DO_LOG = false;

const selectValuer = value => ({ value, label: value });
const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"].map(selectValuer);
const minutes = ["00", "10", "20", "30", "40", "50"].map(selectValuer);

export default function Rent({ text, cost, minHours, hoursText }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[0]);

    useEffect(() => console.log(`Selected time: ${selectedHour.value}:${selectedMinute.value}`), [selectedHour, selectedMinute]);

    const [successModal, setSuccessModal] = useState(false);
    const [rentTimeErrorModal, setRentTimeErrorModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const submit = async () => {
        // if(!selectedTime.length) return setRentTimeErrorModal(true);

        const hour = selectedHour.value;
        const minute = selectedMinute.value;
        console.log(`Submit with selected time: ${hour}:${minute}`);
        return;
        
        const email = AuthProvider.userData.email;
        const phone = AuthProvider.userData.phone;
        DO_LOG && console.log(email, phone, text, selectedTime, toRuDate(selectedDate));

        try {
            const result = await MailProvider.sendRentEmail(email, phone, text, selectedTime, toRuDate(selectedDate));
            if(result.success) {
                setSuccessModal(true);
                setSelectedTime("");
            } else {
                setErrorModal(true);
                console.error({ result });
            }
        } catch(e) {
            setErrorModal(true);
            console.error(e);
        }
    };

    return (<>
        <div className="order-service-wrapper content-block">
            <div className="order-service-block">
                <div className="order-service-title-wrapper">
                    <h2 className="order-service-title">{ text }</h2>
                </div>
                <div className="order-service-price-wrapper">
                    <div className="order-service-price-title">Стоимость</div>
                    <div className="order-service-price-amount">{ cost }р/ч</div>
                </div>
                <div className="order-service-day-wrapper">
                    <div className="order-service-day-title">Выбор дня</div>
                    <div className="order-service-day-datepicker">
                        <DatePicker 
                            onChange={setSelectedDate}
                            selected={selectedDate} 
                            dateFormat="dd.MM.yyyy"
                            dropdownMode="select"
                            showYearDropdown
                            peekNextMonth
                        />
                    </div>
                </div>
                <div className="order-service-time-wrapper">
                    <div className="order-service-time-title">Выбор времени</div>
                    <div className="order-service-time-select">
                        <div className="time-select-from">
                            <Select
                                onChange={setSelectedHour}
                                value={selectedHour}
                                options={hours}
                            />
                            :
                            <Select
                                onChange={setSelectedMinute}
                                value={selectedMinute}
                                options={minutes}
                            />
                        </div>
                        <div className="time-select-to">
                            <Select
                                onChange={setSelectedHour}
                                value={selectedHour}
                                options={hours}
                            />
                            :
                            <Select
                                onChange={setSelectedMinute}
                                value={selectedMinute}
                                options={minutes}
                            />
                        </div>
                    </div>
                </div>
                <div className="order-service-mintime-wrapper">
                    <div className="order-service-mintime-title">Минимальное время аренды</div>
                    <div className="order-service-mintime-time">{ minHours } { hoursText }</div>
                </div>
                <div className="order-service-button-wrapper">
                    <button className="order-service-button" onClick={submit}>Заказать</button>
                </div>
            </div>
        </div>
        <SuccessModal
            content="Успешная аренда, с вами свяжутся для уточнения деталей."
            opened={successModal} close={() => setSuccessModal(false)}
        />
        <ErrorModal
            opened={rentTimeErrorModal} close={() => setRentTimeErrorModal(false)}
            content="Не выбрано время для аренды."
        />
        <DefaultErrorModal opened={errorModal} close={() => setErrorModal(false)} />
    </>);
}