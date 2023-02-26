import { useEffect } from 'react';
import { theme } from '@/utils/constants';

import {
    isAnswerCorrect,
    fieldClasses,
    fieldStyle
} from "@/utils/helpers";
import { CORRECT_COLOR } from "@/utils/constants";

const fieldsToCheck = ["name"];
const correct = {};
const answers = {};

export default function ArtInput(props) {
    const { placeholder, artNameRef, art, handleCorrect } = props;

    useEffect(() => {
        if (artNameRef) {
            artNameRef.current.style.color = theme.input.color;
            artNameRef.current.disabled = false;
            artNameRef.current.focus();
        }
    });

    const handleCheckField = (e) => {
        e.preventDefault();
        const el = e.target;
        const entry = el.value;
        const field = el.dataset.fieldname;
        answers[field] = entry;
        let count = 0;
        fieldsToCheck.forEach((item) => {
            // Is field correct?
            if (isAnswerCorrect(answers[item], art[item])) {
                correct[item] = true;
                count++;
                if (item === "name") {
                    artNameRef.current.style.color = CORRECT_COLOR;
                    artNameRef.current.disabled = true;
                }
            }
        });

        // If all fields have been entered, check them.
        if (count === fieldsToCheck.length) {
            handleCorrect();
        }
    };

    return (
        <div className="mb-3 xl:w-96">
            <input
                ref={artNameRef}
                autoComplete="off"
                type="text"
                data-fieldname="name"
                onInput={handleCheckField}
                style={fieldStyle}
                className={fieldClasses}
                placeholder={placeholder}
            />
        </div>

    )
}
