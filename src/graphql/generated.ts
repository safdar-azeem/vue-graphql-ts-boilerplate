// @ts-nocheck
/* eslint-disable */

/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import gql from 'graphql-tag';
import * as VueApolloComposable from 'vue-apollo-client';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: unknown; output: unknown; }
  DateTime: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  ObjectId: { input: unknown; output: unknown; }
  Upload: { input: unknown; output: unknown; }
};

export type AttachmentFile = {
  __typename?: 'AttachmentFile';
  fileName?: Maybe<Scalars['String']['output']>;
  fileSize?: Maybe<Scalars['Float']['output']>;
  fileType?: Maybe<Scalars['String']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
};

export type AttachmentInput = {
  fileName: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Float']['input']>;
  fileType: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type CreateFolderInput = {
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissions: Array<Permissions>;
};

export type CreateUserInput = {
  customPermissions?: InputMaybe<Array<Permissions>>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  username: Scalars['String']['input'];
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  filename: Scalars['String']['output'];
  folderId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  status: FileStatus;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type FileConnection = {
  __typename?: 'FileConnection';
  items: Array<File>;
  pageInfo: PaginationInfo;
};

export enum FileStatus {
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Uploaded = 'UPLOADED'
}

export type FilesFilterInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  uploadedBy?: InputMaybe<Scalars['String']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  children?: Maybe<Array<Folder>>;
  createdAt: Scalars['DateTime']['output'];
  files?: Maybe<Array<File>>;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FolderConnection = {
  __typename?: 'FolderConnection';
  items: Array<Folder>;
  pageInfo: PaginationInfo;
};

export type FolderFilterInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type Init2faResponse = {
  __typename?: 'Init2faResponse';
  backupCodes: Array<Scalars['String']['output']>;
  qrCode: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ManagedUser = {
  __typename?: 'ManagedUser';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customPermissions: Array<Permissions>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  roles: Array<Role>;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username: Scalars['String']['output'];
  workspaceId: Scalars['String']['output'];
};

export type ManagedUserConnection = {
  __typename?: 'ManagedUserConnection';
  items: Array<ManagedUser>;
  pageInfo: PaginationInfo;
};

export type MfaSettings = {
  __typename?: 'MfaSettings';
  isEnabled: Scalars['Boolean']['output'];
  method?: Maybe<TwoFactorMethod>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRolesToUser: ManagedUser;
  cancelUpload: Scalars['Boolean']['output'];
  confirm2faEnrollment: Scalars['Boolean']['output'];
  confirmUpload: File;
  createFolder: Folder;
  createRole: Role;
  createShareLink: ResourceShareLink;
  createUser: ManagedUser;
  deleteFiles: Scalars['String']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteShareLink: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  disable2fa: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  googleLogin: AuthPayload;
  init2faEnrollment: Init2faResponse;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  logoutAll: Scalars['Boolean']['output'];
  moveFolder: Folder;
  refreshTokens: AuthPayload;
  removeRolesFromUser: ManagedUser;
  renameFolder: Folder;
  requestUploadUrl: SignedUploadUrl;
  resetPassword: Scalars['Boolean']['output'];
  setUserPermissions: ManagedUser;
  setUserRoles: ManagedUser;
  signup: AuthPayload;
  toggleFilePublic: File;
  transferOwnership: Workspace;
  updateRole: Role;
  updateUser: ManagedUser;
  updateUserProfile: User;
  updateUserStatus: ManagedUser;
  updateWorkspace: Workspace;
  verify2FA: AuthPayload;
};


export type MutationAssignRolesToUserArgs = {
  roleIds: Array<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationCancelUploadArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationConfirm2faEnrollmentArgs = {
  otp: Scalars['String']['input'];
};


export type MutationConfirmUploadArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateShareLinkArgs = {
  input: ShareLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteFilesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShareLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisable2faArgs = {
  password: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGoogleLoginArgs = {
  token: Scalars['String']['input'];
};


export type MutationInit2faEnrollmentArgs = {
  method: TwoFactorMethod;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLogoutArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMoveFolderArgs = {
  id: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRemoveRolesFromUserArgs = {
  roleIds: Array<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationRenameFolderArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationRequestUploadUrlArgs = {
  input: RequestUploadInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetUserPermissionsArgs = {
  data: SetUserPermissionsInput;
  userId: Scalars['ID']['input'];
};


export type MutationSetUserRolesArgs = {
  data: SetUserRolesInput;
  userId: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationToggleFilePublicArgs = {
  id: Scalars['ID']['input'];
};


export type MutationTransferOwnershipArgs = {
  data: TransferOwnershipInput;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfileInput;
};


export type MutationUpdateUserStatusArgs = {
  data: UpdateUserStatusInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceArgs = {
  data: UpdateWorkspaceInput;
};


export type MutationVerify2FaArgs = {
  otp: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export enum Permissions {
  AuditRead = 'AUDIT_READ',
  RolesCreate = 'ROLES_CREATE',
  RolesDelete = 'ROLES_DELETE',
  RolesRead = 'ROLES_READ',
  RolesUpdate = 'ROLES_UPDATE',
  UsersCreate = 'USERS_CREATE',
  UsersDelete = 'USERS_DELETE',
  UsersManagePermissions = 'USERS_MANAGE_PERMISSIONS',
  UsersManageRoles = 'USERS_MANAGE_ROLES',
  UsersManageStatus = 'USERS_MANAGE_STATUS',
  UsersRead = 'USERS_READ',
  UsersUpdate = 'USERS_UPDATE',
  WorkspaceRead = 'WORKSPACE_READ',
  WorkspaceTransferOwnership = 'WORKSPACE_TRANSFER_OWNERSHIP',
  WorkspaceUpdate = 'WORKSPACE_UPDATE'
}

export type Query = {
  __typename?: 'Query';
  getFile?: Maybe<File>;
  getFileDownloadUrl: Scalars['String']['output'];
  getFileShareLinks: ResourceShareLinkConnection;
  getFiles: FileConnection;
  getFolder?: Maybe<Folder>;
  getFolderShareLinks: ResourceShareLinkConnection;
  getFolders: FolderConnection;
  getRole: Role;
  getRoles: RoleConnection;
  getUser: ManagedUser;
  getUsers: ManagedUserConnection;
  me?: Maybe<User>;
  workspace: Workspace;
};


export type QueryGetFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFileDownloadUrlArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFileShareLinksArgs = {
  fileId: Scalars['ID']['input'];
  filter?: InputMaybe<ShareLinkFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFilesArgs = {
  filter?: InputMaybe<FilesFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFolderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFolderShareLinksArgs = {
  filter?: InputMaybe<ShareLinkFilterInput>;
  folderId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFoldersArgs = {
  filter?: InputMaybe<FolderFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRolesArgs = {
  filter?: InputMaybe<RoleFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<RoleSortInput>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersArgs = {
  filter?: InputMaybe<UsersFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<UserSortInput>;
};

export type RequestUploadInput = {
  filename: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  folderName?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type ResourceShareLink = {
  __typename?: 'ResourceShareLink';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  fileId?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ResourceShareLinkConnection = {
  __typename?: 'ResourceShareLinkConnection';
  items: Array<ResourceShareLink>;
  pageInfo: PaginationInfo;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSystem: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permissions>;
  updatedAt: Scalars['DateTime']['output'];
  workspaceId: Scalars['String']['output'];
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  items: Array<Role>;
  pageInfo: PaginationInfo;
};

export type RoleFilterInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum RoleSortField {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type RoleSortInput = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<RoleSortField>;
};

export type SetUserPermissionsInput = {
  customPermissions: Array<Permissions>;
};

export type SetUserRolesInput = {
  roleIds: Array<Scalars['ID']['input']>;
};

export type ShareLinkFilterInput = {
  dateRange?: InputMaybe<DateRangeInput>;
};

export type ShareLinkInput = {
  expiresInMinutes?: InputMaybe<Scalars['Int']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
};

export type SignedUploadUrl = {
  __typename?: 'SignedUploadUrl';
  expiresAt: Scalars['DateTime']['output'];
  fileId: Scalars['String']['output'];
  publicUrl: Scalars['String']['output'];
  signedUrl: Scalars['String']['output'];
  storageKey: Scalars['String']['output'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  workspaceName: Scalars['String']['input'];
  workspaceSlug?: InputMaybe<Scalars['String']['input']>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  direction?: InputMaybe<SortDirection>;
  field: Scalars['String']['input'];
};

export type TransferOwnershipInput = {
  newOwnerUserId: Scalars['ID']['input'];
};

export enum TwoFactorMethod {
  Authenticator = 'AUTHENTICATOR',
  Email = 'EMAIL'
}

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Permissions>>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserStatusInput = {
  status: UserStatus;
};

export type UpdateWorkspaceInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mfaSettings?: Maybe<MfaSettings>;
  permissions: Array<Permissions>;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username: Scalars['String']['output'];
  workspaceId: Scalars['String']['output'];
};

export enum UserSortField {
  CreatedAt = 'createdAt',
  Email = 'email',
  UpdatedAt = 'updatedAt',
  Username = 'username'
}

export type UserSortInput = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<UserSortField>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Invited = 'INVITED',
  Suspended = 'SUSPENDED'
}

export enum UserType {
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type UsersFilterInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  status?: InputMaybe<UserStatus>;
};

export type Workspace = {
  __typename?: 'Workspace';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: WorkspaceStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum WorkspaceStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Suspended = 'SUSPENDED'
}

export type CreateFolderInput = {
  isPublic?: boolean | null | undefined;
  name: string;
  parentId?: string | null | undefined;
};

export type DateRangeInput = {
  from?: unknown;
  to?: unknown;
};

export type FileStatus =
  | 'DELETED'
  | 'FAILED'
  | 'PENDING'
  | 'UPLOADED';

export type FilesFilterInput = {
  dateRange?: DateRangeInput | null | undefined;
  folderId?: string | null | undefined;
  uploadedBy?: string | null | undefined;
};

export type FolderFilterInput = {
  dateRange?: DateRangeInput | null | undefined;
  parentId?: string | null | undefined;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type PaginationInput = {
  limit?: number | null | undefined;
  page?: number | null | undefined;
};

export type RequestUploadInput = {
  filename: string;
  folderId?: string | null | undefined;
  folderName?: string | null | undefined;
  isPublic?: boolean | null | undefined;
  mimeType: string;
  size: number;
};

export type ShareLinkFilterInput = {
  dateRange?: DateRangeInput | null | undefined;
};

export type ShareLinkInput = {
  expiresInMinutes?: number | null | undefined;
  fileId?: string | null | undefined;
  folderId?: string | null | undefined;
};

export type SignupInput = {
  email: string;
  password: string;
  username: string;
  workspaceName: string;
  workspaceSlug?: string | null | undefined;
};

export type TwoFactorMethod =
  | 'AUTHENTICATOR'
  | 'EMAIL';

export type UpdateUserProfileInput = {
  avatar?: string | null | undefined;
  username?: string | null | undefined;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { login: { token: string, refreshToken: string, user: { id: string, username: string, email: string, mfaSettings: { isEnabled: boolean, method: TwoFactorMethod | null } | null } } };

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupMutation = { signup: { token: string, refreshToken: string, user: { id: string, username: string, email: string } } };

export type GoogleLoginMutationVariables = Exact<{
  token: string;
}>;


export type GoogleLoginMutation = { googleLogin: { token: string, refreshToken: string, user: { id: string, username: string, email: string, mfaSettings: { isEnabled: boolean, method: TwoFactorMethod | null } | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: string;
}>;


export type ForgotPasswordMutation = { forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: string;
  password: string;
}>;


export type ResetPasswordMutation = { resetPassword: boolean };

export type Verify2FaMutationVariables = Exact<{
  otp: string;
  token: string;
}>;


export type Verify2FaMutation = { verify2FA: { token: string, user: { id: string, username: string, email: string } } };

export type Init2faEnrollmentMutationVariables = Exact<{
  method: TwoFactorMethod;
}>;


export type Init2faEnrollmentMutation = { init2faEnrollment: { secret: string, qrCode: string, backupCodes: Array<string> } };

export type Confirm2faEnrollmentMutationVariables = Exact<{
  otp: string;
}>;


export type Confirm2faEnrollmentMutation = { confirm2faEnrollment: boolean };

export type Disable2faMutationVariables = Exact<{
  password: string;
}>;


export type Disable2faMutation = { disable2fa: boolean };

export type CreateFolderMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderMutation = { createFolder: { id: string, name: string } };

export type DeleteFolderMutationVariables = Exact<{
  id: string | number;
}>;


export type DeleteFolderMutation = { deleteFolder: boolean };

export type DeleteFilesMutationVariables = Exact<{
  ids: Array<string> | string;
}>;


export type DeleteFilesMutation = { deleteFiles: string };

export type CreateShareLinkMutationVariables = Exact<{
  input: ShareLinkInput;
}>;


export type CreateShareLinkMutation = { createShareLink: { id: string, token: string, url: string, expiresAt: unknown } };

export type DeleteShareLinkMutationVariables = Exact<{
  id: string | number;
}>;


export type DeleteShareLinkMutation = { deleteShareLink: boolean };

export type RequestUploadUrlMutationVariables = Exact<{
  input: RequestUploadInput;
}>;


export type RequestUploadUrlMutation = { requestUploadUrl: { signedUrl: string, fileId: string, publicUrl: string, storageKey: string, expiresAt: unknown } };

export type ConfirmUploadMutationVariables = Exact<{
  fileId: string | number;
}>;


export type ConfirmUploadMutation = { confirmUpload: { id: string, filename: string, mimeType: string, size: number, status: FileStatus, url: string | null, isPublic: boolean } };

export type UpdateUserProfileMutationVariables = Exact<{
  data: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { updateUserProfile: { id: string, username: string, avatar: string | null, email: string } };

export type GetFilesQueryVariables = Exact<{
  pagination?: PaginationInput | null | undefined;
  search?: string | null | undefined;
  filter?: FilesFilterInput | null | undefined;
}>;


export type GetFilesQuery = { getFiles: { items: Array<{ id: string, originalName: string, mimeType: string, size: number, url: string | null, updatedAt: unknown, isPublic: boolean }>, pageInfo: { totalItems: number, totalPages: number, currentPage: number } } };

export type GetFoldersQueryVariables = Exact<{
  pagination?: PaginationInput | null | undefined;
  search?: string | null | undefined;
  filter?: FolderFilterInput | null | undefined;
}>;


export type GetFoldersQuery = { getFolders: { items: Array<{ id: string, name: string, path: string, updatedAt: unknown }>, pageInfo: { totalItems: number, totalPages: number, currentPage: number } } };

export type GetFileShareLinksQueryVariables = Exact<{
  fileId: string | number;
  pagination?: PaginationInput | null | undefined;
  search?: string | null | undefined;
  filter?: ShareLinkFilterInput | null | undefined;
}>;


export type GetFileShareLinksQuery = { getFileShareLinks: { items: Array<{ id: string, token: string, url: string, expiresAt: unknown, createdAt: unknown }>, pageInfo: { totalItems: number, totalPages: number, currentPage: number } } };

export type GetFolderShareLinksQueryVariables = Exact<{
  folderId: string | number;
  pagination?: PaginationInput | null | undefined;
  search?: string | null | undefined;
  filter?: ShareLinkFilterInput | null | undefined;
}>;


export type GetFolderShareLinksQuery = { getFolderShareLinks: { items: Array<{ id: string, token: string, url: string, expiresAt: unknown, createdAt: unknown }>, pageInfo: { totalItems: number, totalPages: number, currentPage: number } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, email: string, username: string, createdAt: unknown, updatedAt: unknown, avatar: string | null, mfaSettings: { isEnabled: boolean, method: TwoFactorMethod | null } | null } | null };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    refreshToken
    user {
      id
      username
      email
      mfaSettings {
        isEnabled
        method
      }
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: SignupInput!) {
  signup(data: $data) {
    token
    refreshToken
    user {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($token: String!) {
  googleLogin(token: $token) {
    token
    refreshToken
    user {
      id
      username
      email
      mfaSettings {
        isEnabled
        method
      }
    }
  }
}
    `;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGoogleLoginMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useGoogleLoginMutation(options: VueApolloComposable.UseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
}
export type GoogleLoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useForgotPasswordMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(options: VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password)
}
    `;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordMutation({
 *   variables: {
 *     token: // value for 'token'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const Verify2FaDocument = gql`
    mutation Verify2FA($otp: String!, $token: String!) {
  verify2FA(otp: $otp, token: $token) {
    token
    user {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useVerify2FaMutation__
 *
 * To run a mutation, you first call `useVerify2FaMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVerify2FaMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVerify2FaMutation({
 *   variables: {
 *     otp: // value for 'otp'
 *     token: // value for 'token'
 *   },
 * });
 */
export function useVerify2FaMutation(options: VueApolloComposable.UseMutationOptions<Verify2FaMutation, Verify2FaMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Verify2FaMutation, Verify2FaMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Verify2FaMutation, Verify2FaMutationVariables>(Verify2FaDocument, options);
}
export type Verify2FaMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Verify2FaMutation, Verify2FaMutationVariables>;
export const Init2faEnrollmentDocument = gql`
    mutation Init2faEnrollment($method: TwoFactorMethod!) {
  init2faEnrollment(method: $method) {
    secret
    qrCode
    backupCodes
  }
}
    `;

/**
 * __useInit2faEnrollmentMutation__
 *
 * To run a mutation, you first call `useInit2faEnrollmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useInit2faEnrollmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useInit2faEnrollmentMutation({
 *   variables: {
 *     method: // value for 'method'
 *   },
 * });
 */
export function useInit2faEnrollmentMutation(options: VueApolloComposable.UseMutationOptions<Init2faEnrollmentMutation, Init2faEnrollmentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Init2faEnrollmentMutation, Init2faEnrollmentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Init2faEnrollmentMutation, Init2faEnrollmentMutationVariables>(Init2faEnrollmentDocument, options);
}
export type Init2faEnrollmentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Init2faEnrollmentMutation, Init2faEnrollmentMutationVariables>;
export const Confirm2faEnrollmentDocument = gql`
    mutation Confirm2faEnrollment($otp: String!) {
  confirm2faEnrollment(otp: $otp)
}
    `;

/**
 * __useConfirm2faEnrollmentMutation__
 *
 * To run a mutation, you first call `useConfirm2faEnrollmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useConfirm2faEnrollmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useConfirm2faEnrollmentMutation({
 *   variables: {
 *     otp: // value for 'otp'
 *   },
 * });
 */
export function useConfirm2faEnrollmentMutation(options: VueApolloComposable.UseMutationOptions<Confirm2faEnrollmentMutation, Confirm2faEnrollmentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Confirm2faEnrollmentMutation, Confirm2faEnrollmentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Confirm2faEnrollmentMutation, Confirm2faEnrollmentMutationVariables>(Confirm2faEnrollmentDocument, options);
}
export type Confirm2faEnrollmentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Confirm2faEnrollmentMutation, Confirm2faEnrollmentMutationVariables>;
export const Disable2faDocument = gql`
    mutation Disable2fa($password: String!) {
  disable2fa(password: $password)
}
    `;

/**
 * __useDisable2faMutation__
 *
 * To run a mutation, you first call `useDisable2faMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDisable2faMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDisable2faMutation({
 *   variables: {
 *     password: // value for 'password'
 *   },
 * });
 */
export function useDisable2faMutation(options: VueApolloComposable.UseMutationOptions<Disable2faMutation, Disable2faMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Disable2faMutation, Disable2faMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Disable2faMutation, Disable2faMutationVariables>(Disable2faDocument, options);
}
export type Disable2faMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Disable2faMutation, Disable2faMutationVariables>;
export const CreateFolderDocument = gql`
    mutation CreateFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateFolderMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateFolderMutation(options: VueApolloComposable.UseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
}
export type CreateFolderMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateFolderMutation, CreateFolderMutationVariables>;
export const DeleteFolderDocument = gql`
    mutation DeleteFolder($id: ID!) {
  deleteFolder(id: $id)
}
    `;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteFolderMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFolderMutation(options: VueApolloComposable.UseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
}
export type DeleteFolderMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const DeleteFilesDocument = gql`
    mutation DeleteFiles($ids: [String!]!) {
  deleteFiles(ids: $ids)
}
    `;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteFilesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteFilesMutation(options: VueApolloComposable.UseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(DeleteFilesDocument, options);
}
export type DeleteFilesMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteFilesMutation, DeleteFilesMutationVariables>;
export const CreateShareLinkDocument = gql`
    mutation CreateShareLink($input: ShareLinkInput!) {
  createShareLink(input: $input) {
    id
    token
    url
    expiresAt
  }
}
    `;

/**
 * __useCreateShareLinkMutation__
 *
 * To run a mutation, you first call `useCreateShareLinkMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateShareLinkMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateShareLinkMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateShareLinkMutation(options: VueApolloComposable.UseMutationOptions<CreateShareLinkMutation, CreateShareLinkMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateShareLinkMutation, CreateShareLinkMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateShareLinkMutation, CreateShareLinkMutationVariables>(CreateShareLinkDocument, options);
}
export type CreateShareLinkMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateShareLinkMutation, CreateShareLinkMutationVariables>;
export const DeleteShareLinkDocument = gql`
    mutation DeleteShareLink($id: ID!) {
  deleteShareLink(id: $id)
}
    `;

/**
 * __useDeleteShareLinkMutation__
 *
 * To run a mutation, you first call `useDeleteShareLinkMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShareLinkMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteShareLinkMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShareLinkMutation(options: VueApolloComposable.UseMutationOptions<DeleteShareLinkMutation, DeleteShareLinkMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteShareLinkMutation, DeleteShareLinkMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteShareLinkMutation, DeleteShareLinkMutationVariables>(DeleteShareLinkDocument, options);
}
export type DeleteShareLinkMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteShareLinkMutation, DeleteShareLinkMutationVariables>;
export const RequestUploadUrlDocument = gql`
    mutation RequestUploadUrl($input: RequestUploadInput!) {
  requestUploadUrl(input: $input) {
    signedUrl
    fileId
    publicUrl
    storageKey
    expiresAt
  }
}
    `;

/**
 * __useRequestUploadUrlMutation__
 *
 * To run a mutation, you first call `useRequestUploadUrlMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRequestUploadUrlMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRequestUploadUrlMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRequestUploadUrlMutation(options: VueApolloComposable.UseMutationOptions<RequestUploadUrlMutation, RequestUploadUrlMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RequestUploadUrlMutation, RequestUploadUrlMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RequestUploadUrlMutation, RequestUploadUrlMutationVariables>(RequestUploadUrlDocument, options);
}
export type RequestUploadUrlMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RequestUploadUrlMutation, RequestUploadUrlMutationVariables>;
export const ConfirmUploadDocument = gql`
    mutation ConfirmUpload($fileId: ID!) {
  confirmUpload(fileId: $fileId) {
    id
    filename
    mimeType
    size
    status
    url
    isPublic
  }
}
    `;

/**
 * __useConfirmUploadMutation__
 *
 * To run a mutation, you first call `useConfirmUploadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUploadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useConfirmUploadMutation({
 *   variables: {
 *     fileId: // value for 'fileId'
 *   },
 * });
 */
export function useConfirmUploadMutation(options: VueApolloComposable.UseMutationOptions<ConfirmUploadMutation, ConfirmUploadMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ConfirmUploadMutation, ConfirmUploadMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ConfirmUploadMutation, ConfirmUploadMutationVariables>(ConfirmUploadDocument, options);
}
export type ConfirmUploadMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ConfirmUploadMutation, ConfirmUploadMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($data: UpdateUserProfileInput!) {
  updateUserProfile(data: $data) {
    id
    username
    avatar
    email
  }
}
    `;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserProfileMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
}
export type UpdateUserProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GetFilesDocument = gql`
    query GetFiles($pagination: PaginationInput, $search: String, $filter: FilesFilterInput) {
  getFiles(pagination: $pagination, search: $search, filter: $filter) {
    items {
      id
      originalName
      mimeType
      size
      url
      updatedAt
      isPublic
    }
    pageInfo {
      totalItems
      totalPages
      currentPage
    }
  }
}
    `;

/**
 * __useGetFilesQuery__
 *
 * To run a query within a Vue component, call `useGetFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFilesQuery({
 *   pagination: // value for 'pagination'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useGetFilesQuery(variables: GetFilesQueryVariables | VueCompositionApi.Ref<GetFilesQueryVariables> | ReactiveFunction<GetFilesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, variables, options);
}
export function useGetFilesLazyQuery(variables: GetFilesQueryVariables | VueCompositionApi.Ref<GetFilesQueryVariables> | ReactiveFunction<GetFilesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFilesQuery, GetFilesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, variables, options);
}
export type GetFilesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFilesQuery, GetFilesQueryVariables>;
export const GetFoldersDocument = gql`
    query GetFolders($pagination: PaginationInput, $search: String, $filter: FolderFilterInput) {
  getFolders(pagination: $pagination, search: $search, filter: $filter) {
    items {
      id
      name
      path
      updatedAt
    }
    pageInfo {
      totalItems
      totalPages
      currentPage
    }
  }
}
    `;

/**
 * __useGetFoldersQuery__
 *
 * To run a query within a Vue component, call `useGetFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoldersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFoldersQuery({
 *   pagination: // value for 'pagination'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useGetFoldersQuery(variables: GetFoldersQueryVariables | VueCompositionApi.Ref<GetFoldersQueryVariables> | ReactiveFunction<GetFoldersQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, variables, options);
}
export function useGetFoldersLazyQuery(variables: GetFoldersQueryVariables | VueCompositionApi.Ref<GetFoldersQueryVariables> | ReactiveFunction<GetFoldersQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFoldersQuery, GetFoldersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, variables, options);
}
export type GetFoldersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetFileShareLinksDocument = gql`
    query GetFileShareLinks($fileId: ID!, $pagination: PaginationInput, $search: String, $filter: ShareLinkFilterInput) {
  getFileShareLinks(
    fileId: $fileId
    pagination: $pagination
    search: $search
    filter: $filter
  ) {
    items {
      id
      token
      url
      expiresAt
      createdAt
    }
    pageInfo {
      totalItems
      totalPages
      currentPage
    }
  }
}
    `;

/**
 * __useGetFileShareLinksQuery__
 *
 * To run a query within a Vue component, call `useGetFileShareLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileShareLinksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFileShareLinksQuery({
 *   fileId: // value for 'fileId'
 *   pagination: // value for 'pagination'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useGetFileShareLinksQuery(variables: GetFileShareLinksQueryVariables | VueCompositionApi.Ref<GetFileShareLinksQueryVariables> | ReactiveFunction<GetFileShareLinksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>(GetFileShareLinksDocument, variables, options);
}
export function useGetFileShareLinksLazyQuery(variables?: GetFileShareLinksQueryVariables | VueCompositionApi.Ref<GetFileShareLinksQueryVariables> | ReactiveFunction<GetFileShareLinksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>(GetFileShareLinksDocument, variables, options);
}
export type GetFileShareLinksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFileShareLinksQuery, GetFileShareLinksQueryVariables>;
export const GetFolderShareLinksDocument = gql`
    query GetFolderShareLinks($folderId: ID!, $pagination: PaginationInput, $search: String, $filter: ShareLinkFilterInput) {
  getFolderShareLinks(
    folderId: $folderId
    pagination: $pagination
    search: $search
    filter: $filter
  ) {
    items {
      id
      token
      url
      expiresAt
      createdAt
    }
    pageInfo {
      totalItems
      totalPages
      currentPage
    }
  }
}
    `;

/**
 * __useGetFolderShareLinksQuery__
 *
 * To run a query within a Vue component, call `useGetFolderShareLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderShareLinksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFolderShareLinksQuery({
 *   folderId: // value for 'folderId'
 *   pagination: // value for 'pagination'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useGetFolderShareLinksQuery(variables: GetFolderShareLinksQueryVariables | VueCompositionApi.Ref<GetFolderShareLinksQueryVariables> | ReactiveFunction<GetFolderShareLinksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>(GetFolderShareLinksDocument, variables, options);
}
export function useGetFolderShareLinksLazyQuery(variables?: GetFolderShareLinksQueryVariables | VueCompositionApi.Ref<GetFolderShareLinksQueryVariables> | ReactiveFunction<GetFolderShareLinksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>(GetFolderShareLinksDocument, variables, options);
}
export type GetFolderShareLinksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFolderShareLinksQuery, GetFolderShareLinksQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    createdAt
    updatedAt
    avatar
    mfaSettings {
      isEnabled
      method
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;