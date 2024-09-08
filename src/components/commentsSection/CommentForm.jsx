    // CommentForm
    import React, { useState } from "react";

    function CommentForm({
    btnLable,
    formSubmitHandler,
    formCancelHandler = null,
    initialText= ""
    }) {
    const [value, setValue] = useState(initialText);
    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHandler(value);
        setValue("");
    };
    return (
        <form onSubmit={submitHandler}>
        <div className="flex flex-col p-4 items-end border border-primary rounded-lg">
            <textarea
            className="w-full focus:outline-none bg-transparent"
            onChange={(e) => setValue(e.target.value)}
            rows={5}
            value={value}
            placeholder="Leave your comment here..."
            />
            <div className="flex items-center flex-wrap gap-x-3 pt-2 flex-col-reverse gap-y-2 min-[420px]:flex-row">
            {formCancelHandler && (
                <button onClick={formCancelHandler} className="px-4 py-2 border border-red-500 text-red-500 font-bold rounded-lg">
                Cancel
                </button>
            )}
            <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg"
            >
                {btnLable}
            </button>
            </div>
        </div>
        </form>
    );
    }

    export default CommentForm;
