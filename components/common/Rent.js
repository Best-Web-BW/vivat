import AuthProvider from "../../utils/providers/AuthProvider";
import MailProvider from "../../utils/providers/MailProvider";
import "react-datepicker/dist/react-datepicker.css";
import { reformatDate } from "../../utils/common";
import DatePicker from "react-datepicker";
import { useState } from "react";

const TimeButton = ({ time, turn, active }) => <button className={`order-service-time-button ${active && "active"}`} onClick={turn}>{ time }</button>;

export default function Rent({ text, cost, minHours, hoursText }) {
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const submit = async () => {
        if(!selectedTime.length) return alert("Не выбрано время аренды");
        
        try {
            const email = AuthProvider.userData.email;
            const phone = AuthProvider.userData.phone;
            console.log(email, phone, text, selectedTime, reformatDate(selectedDate));
            const result = await MailProvider.sendRentEmail(email, phone, text, selectedTime, reformatDate(selectedDate));
            if(result.success) {
                alert("Успешная аренда, с вами свяжутся для уточнения деталей");
                setSelectedTime("");
            } else {
                alert("Арендовать время не получилось, попробуйте позже");
                console.log({ result });
            }
        } catch(e) {
            alert("Внутренняя ошибка сервера, попробуйте позже");
            console.log(e);
        }
    };

    return (
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
    );
}