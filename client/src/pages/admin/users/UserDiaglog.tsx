import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UserForm from "./UserForm"
import axios from "axios"

export default function AddUserDialog({
  roleOptions,
  user,
  onSave,
}: {
  roleOptions: { value: string; label: string }[] // value là tên role: "ADMIN", "USER"
  user?: any
  onSave: (updatedUser: any) => void | Promise<void>
}) {
  const [gender, setGender] = useState("")
  const [role, setRole] = useState<string>("") // role là string tên role
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
  
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      fullname: formData.get("fullname"),
      role: role, // chỉ string
      dob: formData.get("dob"),
      // Không gửi: sex, roles, phone, status, ...
    }
  
    try {
      const res = await axios.post("http://localhost:8080/engzone/users", data)
      alert("Tạo người dùng thành công!")
      await onSave(res.data)
      setOpen(false)
      setGender("")
      setRole("")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Backend error:", err.response?.data)
        alert(JSON.stringify(err.response?.data))
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
          <DialogDescription>
            Điền đầy đủ thông tin bên dưới để tạo người dùng.
          </DialogDescription>
        </DialogHeader>

        <form id="user-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <UserForm
            role={role}
            setRole={setRole}
            roleOptions={roleOptions}
          />
        </form>

        <DialogFooter>
          <Button type="submit" form="user-form">
            Thêm người dùng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}