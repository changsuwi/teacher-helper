"use client";

import DivideGroupForm from "./DivideGroupForm";
import { shuffle } from "lodash";
import GroupTable from "./GroupTable";
import { useState } from "react";

export default function Home() {
  const [groups, setGroups] = useState<Student[][]>([]);
  const handleDivideGroup = (students: Student[], numberOfStudentsPerGroup: number) => {

    const groups = [];
    let curr = []
    const shuffleStudents = shuffle(students);

    for (const student of shuffleStudents) {
      curr.push(student);

      if (curr.length === numberOfStudentsPerGroup) {
        groups.push([...curr]);
        curr = [];
      }
    }

    let idx = 0;
    while(curr.length > 0) {
      const group = groups[idx];
      const student = curr.shift();
      if(student) {
        group.push(student);
        idx = (idx + 1) %  groups.length;
      } else {
        break;
      }
      
    }

    setGroups(groups);
    
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl flex-col items-center font-mono text-sm lg:flex">
        
        <DivideGroupForm onDivideGroup={handleDivideGroup}/>
        <div className="w-full mt-8">
          {groups.length > 0 && <GroupTable groups={groups}/>}
        </div>
        
      </div>
    </main>
  );
}
