import { useState } from "react";
import { useNavigate as useNav } from "react-router-dom";

const usePagination = (initialValue: string) => {
    const [pagination, setPagination] = useState(initialValue)



    return { pagination };

};

export { usePagination };
