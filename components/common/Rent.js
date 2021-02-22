import AuthProvider from "../../utils/providers/AuthProvider";
import MailProvider from "../../utils/providers/MailProvider";
import { toRuDate } from "../../utils/common";
import { DefaultErrorModal, ErrorModal, SuccessModal } from "./Modals";
import DatePicker from "./DatePicker";
import { useState } from "react";

const DO_LOG = false;

const TimeButton = ({ time, turn, active }) => <button className={`order-service-time-button ${active && "active"}`} onClick={turn}>{ time }</button>;

export default function Rent({ text, cost, minHours, hoursText }) {
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [successModal, setSuccessModal] = useState(false);
    const [rentTimeErrorModal, setRentTimeErrorModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const submit = async () => {
        if(!selectedTime.length) return setRentTimeErrorModal(true);
        
        try {
            const email = AuthProvider.userData.email;
            const phone = AuthProvider.userData.phone;
            DO_LOG && console.log(email, phone, text, selectedTime, toRuDate(selectedDate));
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
                    {
                        ["09:00 - 12:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 18:00", "17:00 - 20:00"]
                            .map(time => <TimeButton key={time} time={time} active={selectedTime === time} turn={() => setSelectedTime(time)} />)
                    }
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