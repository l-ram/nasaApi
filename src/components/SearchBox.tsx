import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface SearchBoxProps {
}

export default function SearchBox() {

    const [searchText, setSearchText] = useState<string>('');

    console.log(searchText);

    const onSearchChange = (search: string) => {
        setSearchText(search);
    }

    return (

        <div>

            <Box sx={{
                '& > :not(style)': { mt: 15, width: '25ch' },
            }}>
                <TextField

                    id="filled-basic"
                    label="Filter"
                    variant="filled"
                    onChange={(e) => { onSearchChange(e.target.value) }}

                />
            </Box>

        </div>

    );

}