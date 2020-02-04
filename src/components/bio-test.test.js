import React from "react";
import axios from "../axios";
import Bio from "./bio";
import { render, waitForElement, fireEvent } from "@testing-library/react";

jest.mock("../axios");

// TEST 1 //

// test('when no bio is passed to it, an "Add" button is rendered.', () => {
//     const { container } = render(<Bio />);
//
//     expect(container.querySelector("button").innerHTML).toContain(
//         "Edit your Profile"
//     );
//     console.log(container.querySelector("button").innerHTML);
// });

// TEST 2 //

// test('When a bio is passed to it, an "Edit" button is rendered.', () => {
//     const { container } = render(<Bio bio="testing" />);
//
//     expect(container.querySelector("button").innerHTML).toContain(
//         "change your bio"
//     );
//     console.log(container.querySelector("button").innerHTML);
//
// });

// TEST 3 //

// test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered', () => {
//     const { container } = render(<Bio bio="testing" />);
//
//     expect(container.querySelector("textarea")).toBeFalsy();
//
//     fireEvent.click(container.querySelector("button"));
//
//     expect(container.querySelector("textarea")).toBeTruthy();
// });

// TEST 4 //
const myMockFn = jest.fn();
test('Clicking the "Save" button causes an ajax request', async () => {
    axios.post.mockResolvedValue({});

    const { container } = render(<Bio bio="no data" setBio={myMockFn} />);

    fireEvent.click(container.querySelector("button"));

    fireEvent.click(container.querySelector("button"));
    console.log("bio:", container.querySelector("P").innerHTML);

    // const elem = await waitForElement(() => container.querySelectorAll("P")[1]);
    // console.log("element is: ", elem);

    // expect(elem.innerHTML).toBe("new data");
});
