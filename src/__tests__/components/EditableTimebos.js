import { render, cleanup, fireEvent } from '@testing-library/react';
import React from "react";
import EditableTimebox from "../../components/EditableTimebox";

describe('<EditableTimebox />', () => {
    afterEach(cleanup);
    it('shows edit button', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        //expect(result).toEqual();
        //debug();
        expect( () => {
            getByText("Edytuj");
        }).not.toThrow()
        cleanup();
    });

    it('allows editing the timebox', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        fireEvent.click(getByText("Edytuj"));
        //debug();
        fireEvent.click(getByText(/zmiany/));
        expect( () => {
            getByText("Edytuj");
        }).not.toThrow()
        cleanup();
    });
});