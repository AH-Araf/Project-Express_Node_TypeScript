import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TUserName, TGuardian, TLocalGuardian, TStudent, StudentModel } from './student.interface';




const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is require'],
    trim: true, //for remove extra space
    maxlength: [20, 'First name can not be more than 20 characters'],

    //Custom made validation start-----------------------------------------
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
    //Custom made validation end-----------------------------------------
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is require'],

    //3rd party made validation start----------------------------------------- npm
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
    //3rd party made validation end-----------------------------------------
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true }, //unique: true for avoiding same id
    user:{
      type: Schema.Types.ObjectId,
      required: [true, 'UserId is required'],
      unique: true,
      ref: 'User',
    },
    // password: {
    //   type: String,
    //   required: true,
    //   maxlength: [20, 'Password can not be more than 20 characters'],
    // },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid. The gender field can only be one of the following: 'male', 'female' or 'other'",
      },
      required: [true, 'Gender is require'],
    },
    dateOfBirth: { type: String },

    email: {
      type: String,
      required: true,
      unique: true,

      // 3rd party validation npm
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email type',
      },
    },

    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester:{
      type: Schema.Types.ObjectId,
      ref:'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true, //for making virtual full name from 3 split name
    },
  },
);
//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});





//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//Query middleware
studentSchema.pre('find', function (next) {
  //without deleting data seems like deleted
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//using aggregate doing 'findOne'
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});



export const Student = model<TStudent, StudentModel>('Student', studentSchema);
