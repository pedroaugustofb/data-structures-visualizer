import { TextField } from "@mui/material";
import { DataStructureInfos } from "../../../app/page";

interface props {
  data: DataStructureInfos;
  setData: React.Dispatch<React.SetStateAction<DataStructureInfos>>;
}

export default function SequentialListFormHome({ data, setData }: props) {
  return (
    <div className="pt-3">
      <TextField
        type="number"
        className="w-full"
        label="Tamanho máximo da lista"
        placeholder="Tamanho máximo da lista"
        value={data.details?.max_size}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(value) =>
          setData({
            ...data,
            details: {
              ...data.details,
              max_size: parseInt(value.target.value),
            },
          })
        }
      />
    </div>
  );
}
