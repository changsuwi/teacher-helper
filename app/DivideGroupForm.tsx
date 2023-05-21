"use client";

import FileUploader from "@/components/FileUploader";
import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import * as XLSX from "xlsx";

interface DivideGroupFormProps {
  onDivideGroup: (students: Student[], numberOfStudentsPerGroup: number) => void;
}

const DivideGroupForm = ({onDivideGroup}: DivideGroupFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numberOfStudentsPerGroup, setNumberOfStudentsPerGroup] = useState<number>(4);
  const [students, setStudents] = useState<Student[]>([]);
  const onFileUpload = (file: File) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const workbook = XLSX.read(content, { type: "binary" });
        setStudents(convertExcelToStudents(workbook));

      };
      reader.readAsBinaryString(file);
    }
  };

  const convertExcelToStudents = (workbook: XLSX.WorkBook) => {
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
      header: 1,
    });

    const headerRow = jsonData[0];
    const dataRows = jsonData.slice(1);
    const transformedData: Student[] = dataRows
      .map((row: string[]) => ({
        studentNumber: Number(row[0]),
        name: row[1],
      }))
      .filter((row) => row.studentNumber && row.name);
    return transformedData;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onDivideGroup(students, numberOfStudentsPerGroup ||  1)
  }

  const isSubmitDisabled = () => {
    return !selectedFile || !numberOfStudentsPerGroup;
  }

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
      <input
        className="text-black p-2 rounded-lg"
        type="text"
        placeholder="how many students per group"
        onChange={(e) => setNumberOfStudentsPerGroup(Number(e.target.value))}
      />
      {/* <div>
        <input type="file" onChange={onFileUpload} accept=".xlsx,.xls" id="file-uploader"/>
        <label id="label-file-upload" htmlFor="file-uploader">
          <div>
            <p>Drag and drop your file here or</p>
            <button >Upload a file</button>
          </div> 
        </label>
      </div> */}
      {
        selectedFile ? <p>File name: {selectedFile.name}</p> : <FileUploader onFileUpload={onFileUpload}/>
      
      }
      

      <button className="bg-gray-400 rounded-lg p-2 font-bold" type="submit" disabled={isSubmitDisabled()}>divide</button>
    </form>
  );
};

export default DivideGroupForm;
