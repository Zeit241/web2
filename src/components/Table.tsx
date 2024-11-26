//@ts-nocheck
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Search, Trash2 } from "lucide-react";

import React, { useEffect, useState } from "react";

function TableHeaderData(props: { type: "doctors" | "news" | "services" }) {
  if (props.type === "doctors") {
    return (
      <>
        <TableHead>Имя</TableHead>
        <TableHead>Специальность</TableHead>
      </>
    );
  }

  if (props.type === "services") {
    return (
      <>
        <TableHead>Название</TableHead>
        <TableHead>Описание</TableHead>
      </>
    );
  }

  if (props.type === "news") {
    return (
      <>
        <TableHead>Заголовок</TableHead>
        <TableHead>Текст</TableHead>
      </>
    );
  }
}


export default function DashboardTable(props: { data: any; type: string }) {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({ name: "", specialty: "" });

  useEffect(() => {
    setData(props.data)
    setFilteredData(props.data)
  }, []);

  useEffect(() => {
    // const filtered = data?.filter(
    //   (doctor) =>
    //     doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    // );
    // setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleEditData = () => {
    setData(
      data.map((doctor) =>
        doctor.id === editingRecord.id ? editingRecord : doctor,
      ),
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteRecord = (id) => {
    setData(data?.filter((doctor) => doctor.id !== id));
  };
  const handleAddData = () => {
    setData([...data, { id: Date.now(), ...newRecord }]);
    setData({ name: "", specialty: "" });
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    console.log("=>(Table.tsx:133) data", filteredData);
  }, [data]);

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-4 p-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Поиск по таблице"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Создать запись
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>
                  Enter the details of the new doctor.
                </DialogDescription>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newRecord.name}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newRecord,
                        name: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialty" className="text-right">
                    Specialty
                  </Label>
                  <Input
                    id="specialty"
                    value={newRecord.specialty}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newRecord,
                        specialty: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <div>
                <Button onClick={handleAddData}>Add Doctor</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            {data && <TableRow>
              <TableHead className="w-[100px]">№</TableHead>
              <TableHeaderData type={props.type} />
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>}
          </TableHeader>
          <TableBody>
            {filteredData?.map((record, index) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                {props.type === "news" ? <> <TableCell>{record.title}</TableCell>
                  <TableCell>{record.content}</TableCell></> : props.type === "doctors" ? <><TableCell>{record.name}</TableCell>
                    <TableCell>{record.specialty}</TableCell></> : <><TableCell>{record.name}</TableCell>
                  <TableCell>{record.description}</TableCell></>}
                <TableCell className="text-right">
                  <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingRecord(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div>
                        <DialogTitle>Edit Doctor</DialogTitle>
                        <DialogDescription>
                          Edit the details of the doctor.
                        </DialogDescription>
                      </div>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="edit-name"
                            value={editingRecord?.name || ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-specialty"
                            className="text-right"
                          >
                            Specialty
                          </Label>
                          <Input
                            id="edit-specialty"
                            value={editingRecord?.specialty || ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                specialty: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <div>
                        <Button onClick={handleEditData}>Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRecord(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
