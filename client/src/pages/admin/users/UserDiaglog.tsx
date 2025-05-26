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
  roleOptions: { value: number; label: string }[]
  user: any
  onSave: (updatedUser: any) => void | Promise<void>
}) {
  const [gender, setGender] = useState("")
  const [role, setRole] = useState<number | null>(null)
  const [open, setOpen] = useState(false)  // state để mở/đóng modal

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      fullName: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dob: formData.get("dob"),
      sex: gender,
      password: formData.get("password"),
      roleId: Number(role),
    }

    try {
      const res = await axios.post("http://localhost:8080/EngZone/admin/users/register", data)
      alert("Tạo người dùng thành công!")
      await onSave(res.data) // cập nhật danh sách ở component cha
      setOpen(false) // Đóng modal sau khi tạo thành công
      // reset form nếu muốn (reset state gender, role)
      setGender("")
      setRole(null)
    } catch (err) {
      console.error(err)
      alert("Lỗi khi tạo người dùng")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
           Thêm mới
        </Button>
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
            gender={gender}
            setGender={setGender}
            role={role ?? 0}
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
