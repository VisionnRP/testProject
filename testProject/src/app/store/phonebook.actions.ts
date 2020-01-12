// import { Action } from '@ngrx/store';
// import { Post } from '../interface/phonebook';

// export const GET_POST           = 'Post get';
// export const GET_POST_SUCCESS   = 'Post get success';

// export const VOTE_UPDATE        = 'Post Vote';
// export const VOTE_SUCCESS       = 'Post Vote success';
// export const VOTE_FAIL          = 'Post Vote fail';


// export class GetPost implements Action {
//   readonly type = GET_POST;
//   constructor(public payload: string) {}
// }

// export class GetPostSuccess implements Action {
//   readonly type = GET_POST_SUCCESS;
//   constructor(public payload: Post) {}
// }

// export class VoteUpdate implements Action {
//   readonly type = VOTE_UPDATE;
//   constructor(public payload: any) {}
// }

// export class VoteSuccess implements Action {
//   readonly type = VOTE_SUCCESS;
//   constructor(public payload?: any) {}
// }

// export class VoteFail implements Action {
//   readonly type = VOTE_FAIL;
//   constructor(public payload?: any) {}
// }



// export type All
//   = GetPost
//   | GetPostSuccess
//   | VoteUpdate
//   | VoteSuccess
//   | VoteFail;









import { Action } from '@ngrx/store';

import { phonebook } from './phonebook.reducer';

export const QUERY    = '[Pizza] query pizzas';

export const ADDED    = '[Pizza] added';
export const MODIFIED = '[Pizza] modified';
export const REMOVED  = '[Pizza] removed';

export const UPDATE   = '[Pizza] update';
export const SUCCESS  = '[Pizza] update success';

// Initial query
export class Query implements Action {
    readonly type = QUERY;
    constructor() {}
  }

// AngularFire2 StateChanges
export class Added implements Action {
    readonly type = ADDED;
    constructor(public payload: phonebook) {}
}

export class Modified implements Action {
    readonly type = MODIFIED;
    constructor(public payload: phonebook) {}
}

export class Removed implements Action {
    readonly type = REMOVED;
    constructor(public payload: phonebook) {}
}


// Run a Firestore Update
export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<phonebook>,
      ) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() {}
}

export type PizzaActions =
    Query |
    Added |
    Modified |
    Removed |
    Update |
    Success;
