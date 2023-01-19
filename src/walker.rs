use deno_ast::view::*;

use crate::context::Context;

pub trait Walker {
  fn on_enter(&mut self, _node: Node, _ctx: &mut Context) {}
  fn on_exit(&mut self, _node: Node, _ctx: &mut Context) {}

  fn array_lit(&mut self, _n: &ArrayLit, _ctx: &mut Context) {}
  fn array_pat(&mut self, _n: &ArrayPat, _ctx: &mut Context) {}
  fn arrow_expr(&mut self, _n: &ArrowExpr, _ctx: &mut Context) {}
  fn assign_expr(&mut self, _n: &AssignExpr, _ctx: &mut Context) {}
  fn assign_pat(&mut self, _n: &AssignPat, _ctx: &mut Context) {}
  fn assign_pat_prop(&mut self, _n: &AssignPatProp, _ctx: &mut Context) {}
  fn assign_prop(&mut self, _n: &AssignProp, _ctx: &mut Context) {}
  fn await_expr(&mut self, _n: &AwaitExpr, _ctx: &mut Context) {}
  fn big_int(&mut self, _n: &BigInt, _ctx: &mut Context) {}
  fn bin_expr(&mut self, _n: &BinExpr, _ctx: &mut Context) {}
  fn binding_ident(&mut self, _n: &BindingIdent, _ctx: &mut Context) {}
  fn block_stmt(&mut self, _n: &BlockStmt, _ctx: &mut Context) {}
  fn bool(&mut self, _n: &Bool, _ctx: &mut Context) {}
  fn break_stmt(&mut self, _n: &BreakStmt, _ctx: &mut Context) {}
  fn call_expr(&mut self, _n: &CallExpr, _ctx: &mut Context) {}
  fn catch_clause(&mut self, _n: &CatchClause, _ctx: &mut Context) {}
  fn class(&mut self, _n: &Class, _ctx: &mut Context) {}
  fn class_decl(&mut self, _n: &ClassDecl, _ctx: &mut Context) {}
  fn class_expr(&mut self, _n: &ClassExpr, _ctx: &mut Context) {}
  fn class_method(&mut self, _n: &ClassMethod, _ctx: &mut Context) {}
  fn class_prop(&mut self, _n: &ClassProp, _ctx: &mut Context) {}
  fn computed_prop_name(&mut self, _n: &ComputedPropName, _ctx: &mut Context) {}
  fn cond_expr(&mut self, _n: &CondExpr, _ctx: &mut Context) {}
  fn constructor(&mut self, _n: &Constructor, _ctx: &mut Context) {}
  fn continue_stmt(&mut self, _n: &ContinueStmt, _ctx: &mut Context) {}
  fn debugger_stmt(&mut self, _n: &DebuggerStmt, _ctx: &mut Context) {}
  fn decorator(&mut self, _n: &Decorator, _ctx: &mut Context) {}
  fn do_while_stmt(&mut self, _n: &DoWhileStmt, _ctx: &mut Context) {}
  fn empty_stmt(&mut self, _n: &EmptyStmt, _ctx: &mut Context) {}
  fn export_all(&mut self, _n: &ExportAll, _ctx: &mut Context) {}
  fn export_decl(&mut self, _n: &ExportDecl, _ctx: &mut Context) {}
  fn export_default_decl(
    &mut self,
    _n: &ExportDefaultDecl,
    _ctx: &mut Context,
  ) {
  }
  fn export_default_expr(
    &mut self,
    _n: &ExportDefaultExpr,
    _ctx: &mut Context,
  ) {
  }
  fn export_default_specifier(
    &mut self,
    _n: &ExportDefaultSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn export_named_specifier(
    &mut self,
    _n: &ExportNamedSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn export_namespace_specifier(
    &mut self,
    _n: &ExportNamespaceSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn expr_or_spread(&mut self, _n: &ExprOrSpread, _ctx: &mut Context) {}
  fn expr_stmt(&mut self, _n: &ExprStmt, _ctx: &mut Context) {}
  fn fn_decl(&mut self, _n: &FnDecl, _ctx: &mut Context) {}
  fn fn_expr(&mut self, _n: &FnExpr, _ctx: &mut Context) {}
  fn for_in_stmt(&mut self, _n: &ForInStmt, _ctx: &mut Context) {}
  fn for_of_stmt(&mut self, _n: &ForOfStmt, _ctx: &mut Context) {}
  fn for_stmt(&mut self, _n: &ForStmt, _ctx: &mut Context) {}
  fn function(&mut self, _n: &Function, _ctx: &mut Context) {}
  fn getter_prop(&mut self, _n: &GetterProp, _ctx: &mut Context) {}
  fn ident(&mut self, _n: &Ident, _ctx: &mut Context) {}
  fn if_stmt(&mut self, _n: &IfStmt, _ctx: &mut Context) {}
  fn import(&mut self, _n: &Import, _ctx: &mut Context) {}
  fn import_decl(&mut self, _n: &ImportDecl, _ctx: &mut Context) {}
  fn import_default_specifier(
    &mut self,
    _n: &ImportDefaultSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn import_named_specifier(
    &mut self,
    _n: &ImportNamedSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn import_star_as_specifier(
    &mut self,
    _n: &ImportStarAsSpecifier,
    _ctx: &mut Context,
  ) {
  }
  fn invalid(&mut self, _n: &Invalid, _ctx: &mut Context) {}
  fn jsx_attr(&mut self, _n: &JSXAttr, _ctx: &mut Context) {}
  fn jsx_closing_element(
    &mut self,
    _n: &JSXClosingElement,
    _ctx: &mut Context,
  ) {
  }
  fn jsx_closing_fragment(
    &mut self,
    _n: &JSXClosingFragment,
    _ctx: &mut Context,
  ) {
  }
  fn jsx_element(&mut self, _n: &JSXElement, _ctx: &mut Context) {}
  fn jsx_empty_expr(&mut self, _n: &JSXEmptyExpr, _ctx: &mut Context) {}
  fn jsx_expr_container(&mut self, _n: &JSXExprContainer, _ctx: &mut Context) {}
  fn jsx_fragment(&mut self, _n: &JSXFragment, _ctx: &mut Context) {}
  fn jsx_member_expr(&mut self, _n: &JSXMemberExpr, _ctx: &mut Context) {}
  fn jsx_namespaced_name(
    &mut self,
    _n: &JSXNamespacedName,
    _ctx: &mut Context,
  ) {
  }
  fn jsx_opening_element(
    &mut self,
    _n: &JSXOpeningElement,
    _ctx: &mut Context,
  ) {
  }
  fn jsx_opening_fragment(
    &mut self,
    _n: &JSXOpeningFragment,
    _ctx: &mut Context,
  ) {
  }
  fn jsx_spread_child(&mut self, _n: &JSXSpreadChild, _ctx: &mut Context) {}
  fn jsx_text(&mut self, _n: &JSXText, _ctx: &mut Context) {}
  fn key_value_pat_prop(&mut self, _n: &KeyValuePatProp, _ctx: &mut Context) {}
  fn key_value_prop(&mut self, _n: &KeyValueProp, _ctx: &mut Context) {}
  fn labeled_stmt(&mut self, _n: &LabeledStmt, _ctx: &mut Context) {}
  fn member_expr(&mut self, _n: &MemberExpr, _ctx: &mut Context) {}
  fn meta_prop_expr(&mut self, _n: &MetaPropExpr, _ctx: &mut Context) {}
  fn method_prop(&mut self, _n: &MethodProp, _ctx: &mut Context) {}
  fn module(&mut self, _n: &Module, _ctx: &mut Context) {}
  fn named_export(&mut self, _n: &NamedExport, _ctx: &mut Context) {}
  fn new_expr(&mut self, _n: &NewExpr, _ctx: &mut Context) {}
  fn null(&mut self, _n: &Null, _ctx: &mut Context) {}
  fn number(&mut self, _n: &Number, _ctx: &mut Context) {}
  fn object_lit(&mut self, _n: &ObjectLit, _ctx: &mut Context) {}
  fn object_pat(&mut self, _n: &ObjectPat, _ctx: &mut Context) {}
  fn opt_chain_expr(&mut self, _n: &OptChainExpr, _ctx: &mut Context) {}
  fn opt_call(&mut self, _n: &OptCall, _ctx: &mut Context) {}
  fn param(&mut self, _n: &Param, _ctx: &mut Context) {}
  fn paren_expr(&mut self, _n: &ParenExpr, _ctx: &mut Context) {}
  fn private_method(&mut self, _n: &PrivateMethod, _ctx: &mut Context) {}
  fn private_name(&mut self, _n: &PrivateName, _ctx: &mut Context) {}
  fn private_prop(&mut self, _n: &PrivateProp, _ctx: &mut Context) {}
  fn regex(&mut self, _n: &Regex, _ctx: &mut Context) {}
  fn rest_pat(&mut self, _n: &RestPat, _ctx: &mut Context) {}
  fn return_stmt(&mut self, _n: &ReturnStmt, _ctx: &mut Context) {}
  fn script(&mut self, _n: &Script, _ctx: &mut Context) {}
  fn seq_expr(&mut self, _n: &SeqExpr, _ctx: &mut Context) {}
  fn setter_prop(&mut self, _n: &SetterProp, _ctx: &mut Context) {}
  fn spread_element(&mut self, _n: &SpreadElement, _ctx: &mut Context) {}
  fn static_block(&mut self, _n: &StaticBlock, _ctx: &mut Context) {}
  fn str(&mut self, _n: &Str, _ctx: &mut Context) {}
  fn super_(&mut self, _n: &Super, _ctx: &mut Context) {}
  fn super_prop_expr(&mut self, _n: &SuperPropExpr, _ctx: &mut Context) {}
  fn switch_case(&mut self, _n: &SwitchCase, _ctx: &mut Context) {}
  fn switch_stmt(&mut self, _n: &SwitchStmt, _ctx: &mut Context) {}
  fn tagged_tpl(&mut self, _n: &TaggedTpl, _ctx: &mut Context) {}
  fn this_expr(&mut self, _n: &ThisExpr, _ctx: &mut Context) {}
  fn throw_stmt(&mut self, _n: &ThrowStmt, _ctx: &mut Context) {}
  fn tpl(&mut self, _n: &Tpl, _ctx: &mut Context) {}
  fn tpl_element(&mut self, _n: &TplElement, _ctx: &mut Context) {}
  fn try_stmt(&mut self, _n: &TryStmt, _ctx: &mut Context) {}
  fn ts_array_type(&mut self, _n: &TsArrayType, _ctx: &mut Context) {}
  fn ts_as_expr(&mut self, _n: &TsAsExpr, _ctx: &mut Context) {}
  fn ts_satisfies_expr(
    &mut self,
    _n: &TsSatisfiesExpr,
    _ctx: &mut Context,
  ) {
  }
  fn ts_call_signature_decl(
    &mut self,
    _n: &TsCallSignatureDecl,
    _ctx: &mut Context,
  ) {
  }
  fn ts_conditional_type(
    &mut self,
    _n: &TsConditionalType,
    _ctx: &mut Context,
  ) {
  }
  fn ts_const_assertion(&mut self, _n: &TsConstAssertion, _ctx: &mut Context) {}
  fn ts_construct_signature_decl(
    &mut self,
    _n: &TsConstructSignatureDecl,
    _ctx: &mut Context,
  ) {
  }
  fn ts_constructor_type(
    &mut self,
    _n: &TsConstructorType,
    _ctx: &mut Context,
  ) {
  }
  fn ts_enum_decl(&mut self, _n: &TsEnumDecl, _ctx: &mut Context) {}
  fn ts_enum_member(&mut self, _n: &TsEnumMember, _ctx: &mut Context) {}
  fn ts_export_assignment(
    &mut self,
    _n: &TsExportAssignment,
    _ctx: &mut Context,
  ) {
  }
  fn ts_expr_with_type_args(
    &mut self,
    _n: &TsExprWithTypeArgs,
    _ctx: &mut Context,
  ) {
  }
  fn ts_external_module_ref(
    &mut self,
    _n: &TsExternalModuleRef,
    _ctx: &mut Context,
  ) {
  }
  fn ts_fn_type(&mut self, _n: &TsFnType, _ctx: &mut Context) {}
  fn ts_getter_signature(
    &mut self,
    _n: &TsGetterSignature,
    _ctx: &mut Context,
  ) {
  }
  fn ts_import_equal_decl(
    &mut self,
    _n: &TsImportEqualsDecl,
    _ctx: &mut Context,
  ) {
  }
  fn ts_import_type(&mut self, _n: &TsImportType, _ctx: &mut Context) {}
  fn ts_index_signature(&mut self, _n: &TsIndexSignature, _ctx: &mut Context) {}
  fn ts_indexed_access_type(
    &mut self,
    _n: &TsIndexedAccessType,
    _ctx: &mut Context,
  ) {
  }
  fn ts_infer_type(&mut self, _n: &TsInferType, _ctx: &mut Context) {}
  fn ts_instantiation(&mut self, _n: &TsInstantiation, _ctx: &mut Context) {}
  fn ts_interface_body(&mut self, _n: &TsInterfaceBody, _ctx: &mut Context) {}
  fn ts_interface_decl(&mut self, _n: &TsInterfaceDecl, _ctx: &mut Context) {}
  fn ts_intersection_type(
    &mut self,
    _n: &TsIntersectionType,
    _ctx: &mut Context,
  ) {
  }
  fn ts_keyword_type(&mut self, _n: &TsKeywordType, _ctx: &mut Context) {}
  fn ts_lit_type(&mut self, _n: &TsLitType, _ctx: &mut Context) {}
  fn ts_mapped_type(&mut self, _n: &TsMappedType, _ctx: &mut Context) {}
  fn ts_method_signature(
    &mut self,
    _n: &TsMethodSignature,
    _ctx: &mut Context,
  ) {
  }
  fn ts_module_block(&mut self, _n: &TsModuleBlock, _ctx: &mut Context) {}
  fn ts_module_decl(&mut self, _n: &TsModuleDecl, _ctx: &mut Context) {}
  fn ts_namespace_decl(&mut self, _n: &TsNamespaceDecl, _ctx: &mut Context) {}
  fn ts_namespace_export_decl(
    &mut self,
    _n: &TsNamespaceExportDecl,
    _ctx: &mut Context,
  ) {
  }
  fn ts_non_null_expr(&mut self, _n: &TsNonNullExpr, _ctx: &mut Context) {}
  fn ts_optional_type(&mut self, _n: &TsOptionalType, _ctx: &mut Context) {}
  fn ts_param_prop(&mut self, _n: &TsParamProp, _ctx: &mut Context) {}
  fn ts_parenthesized_type(
    &mut self,
    _n: &TsParenthesizedType,
    _ctx: &mut Context,
  ) {
  }
  fn ts_property_signature(
    &mut self,
    _n: &TsPropertySignature,
    _ctx: &mut Context,
  ) {
  }
  fn ts_qualified_name(&mut self, _n: &TsQualifiedName, _ctx: &mut Context) {}
  fn ts_rest_type(&mut self, _n: &TsRestType, _ctx: &mut Context) {}
  fn ts_setter_signature(
    &mut self,
    _n: &TsSetterSignature,
    _ctx: &mut Context,
  ) {
  }
  fn ts_this_type(&mut self, _n: &TsThisType, _ctx: &mut Context) {}
  fn ts_tpl_lit_type(&mut self, _n: &TsTplLitType, _ctx: &mut Context) {}
  fn ts_tuple_element(&mut self, _n: &TsTupleElement, _ctx: &mut Context) {}
  fn ts_tuple_type(&mut self, _n: &TsTupleType, _ctx: &mut Context) {}
  fn ts_type_alias_decl(&mut self, _n: &TsTypeAliasDecl, _ctx: &mut Context) {}
  fn ts_type_ann(&mut self, _n: &TsTypeAnn, _ctx: &mut Context) {}
  fn ts_type_assertion(&mut self, _n: &TsTypeAssertion, _ctx: &mut Context) {}
  fn ts_type_lit(&mut self, _n: &TsTypeLit, _ctx: &mut Context) {}
  fn ts_type_operator(&mut self, _n: &TsTypeOperator, _ctx: &mut Context) {}
  fn ts_type_param(&mut self, _n: &TsTypeParam, _ctx: &mut Context) {}
  fn ts_type_param_decl(&mut self, _n: &TsTypeParamDecl, _ctx: &mut Context) {}
  fn ts_type_param_instantiation(
    &mut self,
    _n: &TsTypeParamInstantiation,
    _ctx: &mut Context,
  ) {
  }
  fn ts_type_predicate(&mut self, _n: &TsTypePredicate, _ctx: &mut Context) {}
  fn ts_type_query(&mut self, _n: &TsTypeQuery, _ctx: &mut Context) {}
  fn ts_type_ref(&mut self, _n: &TsTypeRef, _ctx: &mut Context) {}
  fn ts_union_type(&mut self, _n: &TsUnionType, _ctx: &mut Context) {}
  fn unary_expr(&mut self, _n: &UnaryExpr, _ctx: &mut Context) {}
  fn update_expr(&mut self, _n: &UpdateExpr, _ctx: &mut Context) {}
  fn var_decl(&mut self, _n: &VarDecl, _ctx: &mut Context) {}
  fn var_declarator(&mut self, _n: &VarDeclarator, _ctx: &mut Context) {}
  fn while_stmt(&mut self, _n: &WhileStmt, _ctx: &mut Context) {}
  fn with_stmt(&mut self, _n: &WithStmt, _ctx: &mut Context) {}
  fn yield_expr(&mut self, _n: &YieldExpr, _ctx: &mut Context) {}
}

pub trait Traverse: Walker {
  fn traverse<'view, N>(&mut self, node: N, ctx: &mut Context)
  where
    N: NodeTrait<'view>,
  {
    let node = node.as_node();

    ctx.traversal.reset();

    self.on_enter(node, ctx);

    use deno_ast::view::Node::*;
    match node {
      ArrayLit(n) => self.array_lit(n, ctx),
      ArrayPat(n) => self.array_pat(n, ctx),
      ArrowExpr(n) => self.arrow_expr(n, ctx),
      AssignExpr(n) => self.assign_expr(n, ctx),
      AssignPat(n) => self.assign_pat(n, ctx),
      AssignPatProp(n) => self.assign_pat_prop(n, ctx),
      AssignProp(n) => self.assign_prop(n, ctx),
      AwaitExpr(n) => self.await_expr(n, ctx),
      BigInt(n) => self.big_int(n, ctx),
      BinExpr(n) => self.bin_expr(n, ctx),
      BindingIdent(n) => self.binding_ident(n, ctx),
      BlockStmt(n) => self.block_stmt(n, ctx),
      Bool(n) => self.bool(n, ctx),
      BreakStmt(n) => self.break_stmt(n, ctx),
      CallExpr(n) => self.call_expr(n, ctx),
      CatchClause(n) => self.catch_clause(n, ctx),
      Class(n) => self.class(n, ctx),
      ClassDecl(n) => self.class_decl(n, ctx),
      ClassExpr(n) => self.class_expr(n, ctx),
      ClassMethod(n) => self.class_method(n, ctx),
      ClassProp(n) => self.class_prop(n, ctx),
      ComputedPropName(n) => self.computed_prop_name(n, ctx),
      CondExpr(n) => self.cond_expr(n, ctx),
      Constructor(n) => self.constructor(n, ctx),
      ContinueStmt(n) => self.continue_stmt(n, ctx),
      DebuggerStmt(n) => self.debugger_stmt(n, ctx),
      Decorator(n) => self.decorator(n, ctx),
      DoWhileStmt(n) => self.do_while_stmt(n, ctx),
      EmptyStmt(n) => self.empty_stmt(n, ctx),
      ExportAll(n) => self.export_all(n, ctx),
      ExportDecl(n) => self.export_decl(n, ctx),
      ExportDefaultDecl(n) => self.export_default_decl(n, ctx),
      ExportDefaultExpr(n) => self.export_default_expr(n, ctx),
      ExportDefaultSpecifier(n) => self.export_default_specifier(n, ctx),
      ExportNamedSpecifier(n) => self.export_named_specifier(n, ctx),
      ExportNamespaceSpecifier(n) => self.export_namespace_specifier(n, ctx),
      ExprOrSpread(n) => self.expr_or_spread(n, ctx),
      ExprStmt(n) => self.expr_stmt(n, ctx),
      FnDecl(n) => self.fn_decl(n, ctx),
      FnExpr(n) => self.fn_expr(n, ctx),
      ForInStmt(n) => self.for_in_stmt(n, ctx),
      ForOfStmt(n) => self.for_of_stmt(n, ctx),
      ForStmt(n) => self.for_stmt(n, ctx),
      Function(n) => self.function(n, ctx),
      GetterProp(n) => self.getter_prop(n, ctx),
      Ident(n) => self.ident(n, ctx),
      IfStmt(n) => self.if_stmt(n, ctx),
      Import(n) => self.import(n, ctx),
      ImportDecl(n) => self.import_decl(n, ctx),
      ImportDefaultSpecifier(n) => self.import_default_specifier(n, ctx),
      ImportNamedSpecifier(n) => self.import_named_specifier(n, ctx),
      ImportStarAsSpecifier(n) => self.import_star_as_specifier(n, ctx),
      Invalid(n) => self.invalid(n, ctx),
      JSXAttr(n) => self.jsx_attr(n, ctx),
      JSXClosingElement(n) => self.jsx_closing_element(n, ctx),
      JSXClosingFragment(n) => self.jsx_closing_fragment(n, ctx),
      JSXElement(n) => self.jsx_element(n, ctx),
      JSXEmptyExpr(n) => self.jsx_empty_expr(n, ctx),
      JSXExprContainer(n) => self.jsx_expr_container(n, ctx),
      JSXFragment(n) => self.jsx_fragment(n, ctx),
      JSXMemberExpr(n) => self.jsx_member_expr(n, ctx),
      JSXNamespacedName(n) => self.jsx_namespaced_name(n, ctx),
      JSXOpeningElement(n) => self.jsx_opening_element(n, ctx),
      JSXOpeningFragment(n) => self.jsx_opening_fragment(n, ctx),
      JSXSpreadChild(n) => self.jsx_spread_child(n, ctx),
      JSXText(n) => self.jsx_text(n, ctx),
      KeyValuePatProp(n) => self.key_value_pat_prop(n, ctx),
      KeyValueProp(n) => self.key_value_prop(n, ctx),
      LabeledStmt(n) => self.labeled_stmt(n, ctx),
      MemberExpr(n) => self.member_expr(n, ctx),
      MetaPropExpr(n) => self.meta_prop_expr(n, ctx),
      MethodProp(n) => self.method_prop(n, ctx),
      Module(n) => self.module(n, ctx),
      NamedExport(n) => self.named_export(n, ctx),
      NewExpr(n) => self.new_expr(n, ctx),
      Null(n) => self.null(n, ctx),
      Number(n) => self.number(n, ctx),
      ObjectLit(n) => self.object_lit(n, ctx),
      ObjectPat(n) => self.object_pat(n, ctx),
      OptChainExpr(n) => self.opt_chain_expr(n, ctx),
      OptCall(n) => self.opt_call(n, ctx),
      Param(n) => self.param(n, ctx),
      ParenExpr(n) => self.paren_expr(n, ctx),
      PrivateMethod(n) => self.private_method(n, ctx),
      PrivateName(n) => self.private_name(n, ctx),
      PrivateProp(n) => self.private_prop(n, ctx),
      Regex(n) => self.regex(n, ctx),
      RestPat(n) => self.rest_pat(n, ctx),
      ReturnStmt(n) => self.return_stmt(n, ctx),
      Script(n) => self.script(n, ctx),
      SeqExpr(n) => self.seq_expr(n, ctx),
      SetterProp(n) => self.setter_prop(n, ctx),
      SpreadElement(n) => self.spread_element(n, ctx),
      StaticBlock(n) => self.static_block(n, ctx),
      Str(n) => self.str(n, ctx),
      Super(n) => self.super_(n, ctx),
      SuperPropExpr(n) => self.super_prop_expr(n, ctx),
      SwitchCase(n) => self.switch_case(n, ctx),
      SwitchStmt(n) => self.switch_stmt(n, ctx),
      TaggedTpl(n) => self.tagged_tpl(n, ctx),
      ThisExpr(n) => self.this_expr(n, ctx),
      ThrowStmt(n) => self.throw_stmt(n, ctx),
      Tpl(n) => self.tpl(n, ctx),
      TplElement(n) => self.tpl_element(n, ctx),
      TryStmt(n) => self.try_stmt(n, ctx),
      TsArrayType(n) => self.ts_array_type(n, ctx),
      TsAsExpr(n) => self.ts_as_expr(n, ctx),
      TsCallSignatureDecl(n) => self.ts_call_signature_decl(n, ctx),
      TsConditionalType(n) => self.ts_conditional_type(n, ctx),
      TsConstAssertion(n) => self.ts_const_assertion(n, ctx),
      TsConstructSignatureDecl(n) => self.ts_construct_signature_decl(n, ctx),
      TsConstructorType(n) => self.ts_constructor_type(n, ctx),
      TsEnumDecl(n) => self.ts_enum_decl(n, ctx),
      TsEnumMember(n) => self.ts_enum_member(n, ctx),
      TsExportAssignment(n) => self.ts_export_assignment(n, ctx),
      TsExprWithTypeArgs(n) => self.ts_expr_with_type_args(n, ctx),
      TsExternalModuleRef(n) => self.ts_external_module_ref(n, ctx),
      TsFnType(n) => self.ts_fn_type(n, ctx),
      TsGetterSignature(n) => self.ts_getter_signature(n, ctx),
      TsImportEqualsDecl(n) => self.ts_import_equal_decl(n, ctx),
      TsImportType(n) => self.ts_import_type(n, ctx),
      TsIndexSignature(n) => self.ts_index_signature(n, ctx),
      TsIndexedAccessType(n) => self.ts_indexed_access_type(n, ctx),
      TsInferType(n) => self.ts_infer_type(n, ctx),
      TsInstantiation(n) => self.ts_instantiation(n, ctx),
      TsInterfaceBody(n) => self.ts_interface_body(n, ctx),
      TsInterfaceDecl(n) => self.ts_interface_decl(n, ctx),
      TsIntersectionType(n) => self.ts_intersection_type(n, ctx),
      TsKeywordType(n) => self.ts_keyword_type(n, ctx),
      TsLitType(n) => self.ts_lit_type(n, ctx),
      TsMappedType(n) => self.ts_mapped_type(n, ctx),
      TsMethodSignature(n) => self.ts_method_signature(n, ctx),
      TsModuleBlock(n) => self.ts_module_block(n, ctx),
      TsModuleDecl(n) => self.ts_module_decl(n, ctx),
      TsNamespaceDecl(n) => self.ts_namespace_decl(n, ctx),
      TsNamespaceExportDecl(n) => self.ts_namespace_export_decl(n, ctx),
      TsNonNullExpr(n) => self.ts_non_null_expr(n, ctx),
      TsOptionalType(n) => self.ts_optional_type(n, ctx),
      TsParamProp(n) => self.ts_param_prop(n, ctx),
      TsParenthesizedType(n) => self.ts_parenthesized_type(n, ctx),
      TsPropertySignature(n) => self.ts_property_signature(n, ctx),
      TsQualifiedName(n) => self.ts_qualified_name(n, ctx),
      TsRestType(n) => self.ts_rest_type(n, ctx),
      TsSatisfiesExpr(n) => self.ts_satisfies_expr(n, ctx),
      TsSetterSignature(n) => self.ts_setter_signature(n, ctx),
      TsThisType(n) => self.ts_this_type(n, ctx),
      TsTplLitType(n) => self.ts_tpl_lit_type(n, ctx),
      TsTupleElement(n) => self.ts_tuple_element(n, ctx),
      TsTupleType(n) => self.ts_tuple_type(n, ctx),
      TsTypeAliasDecl(n) => self.ts_type_alias_decl(n, ctx),
      TsTypeAnn(n) => self.ts_type_ann(n, ctx),
      TsTypeAssertion(n) => self.ts_type_assertion(n, ctx),
      TsTypeLit(n) => self.ts_type_lit(n, ctx),
      TsTypeOperator(n) => self.ts_type_operator(n, ctx),
      TsTypeParam(n) => self.ts_type_param(n, ctx),
      TsTypeParamDecl(n) => self.ts_type_param_decl(n, ctx),
      TsTypeParamInstantiation(n) => self.ts_type_param_instantiation(n, ctx),
      TsTypePredicate(n) => self.ts_type_predicate(n, ctx),
      TsTypeQuery(n) => self.ts_type_query(n, ctx),
      TsTypeRef(n) => self.ts_type_ref(n, ctx),
      TsUnionType(n) => self.ts_union_type(n, ctx),
      UnaryExpr(n) => self.unary_expr(n, ctx),
      UpdateExpr(n) => self.update_expr(n, ctx),
      VarDecl(n) => self.var_decl(n, ctx),
      VarDeclarator(n) => self.var_declarator(n, ctx),
      WhileStmt(n) => self.while_stmt(n, ctx),
      WithStmt(n) => self.with_stmt(n, ctx),
      YieldExpr(n) => self.yield_expr(n, ctx),
    };

    if !ctx.traversal.should_skip() {
      for child in node.children() {
        self.traverse(child, ctx);
      }
    }

    self.on_exit(node, ctx);
  }
}

impl<W: Walker> Traverse for W {}
